"use client";

import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";
import { CopyIcon } from "@/assets/icons/CopyIcon";
import { GIftIcon } from "@/assets/icons/GIftIcon";
import { HistoryGift } from "@/components/CommercialMarket/HistoryGift";
import { Referral } from "@/components/CommercialMarket/Referral";
import { ModalConnectWallet } from "@/components/ModalConnectWallet";
import { ModalWheel } from "@/components/ModalWheel";
import Loader from "@/components/common/Loader";
import { ButtonPrimary } from "@/components/core/Button";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { onToast } from "@/hooks/useToast";
import { Giftbox, GiftboxData } from "@/interfaces/Giftbox";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";
import { giftboxService } from "@/services/GiftboxService";
import {
  AMOUNT_BUY_GIFT,
  AVAILABLE_GIFTBOXES,
  USDT_TO_VPL_EXCHANGE_RATE,
  getStaticURL,
} from "@/utils/constants";
import {
  convertBalanceDecimalToNumber,
  convertNumberToFormattedString,
} from "@/utils/converter";
import abiUsdtToken from "@/web3/abi/token.json";
import { useToken } from "@/web3/hooks/useToken";
import { CONTRACT_ADDRESS, EToken, ITokenOption, TOKENS } from "@/web3/token";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LazyLoad from "react-lazyload";
import "../../../i18n";
import { currencyService } from "@/services/CurrencyService";
import { SimpleArrowIcon } from "@/assets/icons/SimpleArrowIcon";

const TokenOptions: ITokenOption[] = [
  {
    name: TOKENS.USDT.name,
    value: EToken.USDT,
    image: `${getStaticURL()}/assets/images/liquidity/${TOKENS.USDT.image}`,
    abi: abiUsdtToken,
    address: "",
  },
];
declare const window: any;
export default function CommercialMarketPage() {
  const { t } = useTranslation();
  const [usdtInput, setUsdtInput] = useState("");
  const [giftSell, setGiftSell] = useState<number>(0);
  const [amount, setAmount] = useState<number>(AMOUNT_BUY_GIFT);
  const [currentToken, setCurrentToken] = useState<EToken>(EToken.USDT);
  const [isOpenWheel, setIsOpenWheel] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [isOpenModalGift, setIsOpenModalGift] = useState(false);
  const [giftBoxData, setGiftBoxData] = useState<Giftbox>();
  const [currencyDex, setCurrencyDex] = useState<number>(
    USDT_TO_VPL_EXCHANGE_RATE,
  );
  const [{ from, to }, setSwap] = useState({
    from: {
      key: EToken.USDT,
      value: 0,
    },
    to: {
      key: EToken.VPL,
      value: 0,
    },
  });
  const [token, setToken] = useState<ITokenOption>(TokenOptions[0]);

  const { connectorName } = useAugmentlabsWalletContext();
  const {
    hook,
    connector: { provider },
  } = useConnectorByName(connectorName);

  const { getBalance, getDecimals, importNFT } = useToken();
  const account = hook.useAccount();
  const networkSeleted = hook.useChainId() as E_NETWORK_ID;
  const { executeRecaptcha, loaded } = useReCaptcha();

  useEffect(() => {
    if (account && networkSeleted) {
      fetchTokenBalance();
    }
  }, [account, networkSeleted, currentToken]);

  useEffect(() => {
    if (loaded) {
      getUserStatus();
      // fetchCurrencyDex();
    }
    const interval = setInterval(getUserStatus, 10000);
    // const intervalCurrency = setInterval(fetchCurrencyDex, 10000);
    return () => {
      clearInterval(interval);
      // clearInterval(intervalCurrency);
    };
  }, [loaded, account]);

  const getUserStatus = async () => {
    // if (!account || !networkSeleted) return;
    try {
      if (!loaded) return;
      const token = await executeRecaptcha("form_submit");
      const response = await giftboxService.getGiftBoxStatus(account, token);
      if (response.success) {
        setGiftBoxData(response.data);
        if (
          response.data.giftboxStatuses.completed &&
          response.data.giftboxStatuses.completed.length !== 0
        ) {
          setGiftSell(response.data.giftboxStatuses.completed.length);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hashAccount = useMemo(() => {
    if (account) {
      return `${account.slice(0, 4)}...${account.slice(
        account.length - 4,
        account.length,
      )}`;
    }

    return "";
  }, [account, connectorName]);

  const exchangeCalculated = useMemo(() => {
    if (to.key === EToken.VPL)
      return convertNumberToFormattedString(Number(1 / currencyDex).toFixed(2));
    if (to.key === EToken.USDT)
      return convertNumberToFormattedString(currencyDex.toFixed(6));
  }, [to, currencyDex]);

  const calcSwap = (fromName: string, fromValue: number) => {
    if (fromName === EToken.VPL) {
      return Number(fromValue * currencyDex).toFixed(6);
    }
    if (fromName === EToken.USDT) {
      return convertNumberToFormattedString(
        Number(fromValue / currencyDex).toFixed(2),
      );
    }
  };

  const calcValueBuy = (token: string) => {
    if (token === EToken.VPL) {
      return convertNumberToFormattedString(
        Number(amount / currencyDex).toFixed(2),
      );
    }
    if (token === EToken.USDT) {
      return amount;
    }
  };

  // const fetchCurrencyDex = async () => {
  //   try {
  //     const data = await currencyService.getCurrencyDEX();
  //     if (data && data.pair.priceUsd) {
  //       setCurrencyDex(Number(data.pair.priceUsd));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchTokenBalance = async () => {
    if (!account || !networkSeleted) return;

    setToken({
      ...token,
      address: CONTRACT_ADDRESS[currentToken][networkSeleted],
    });
    let balanceConvert = "0";

    const decimal = await getDecimals(
      CONTRACT_ADDRESS[currentToken][networkSeleted],
      token.abi,
    );
    const balance = await getBalance(
      CONTRACT_ADDRESS[currentToken][networkSeleted],
      token.abi,
    );

    balanceConvert = Number(
      convertBalanceDecimalToNumber(balance, decimal),
    ).toFixed(2);
    setBalance(Number(balanceConvert));
  };

  return (
    <DefaultLayout
      pageTitle="Coming Soon"
      containerStyle="bg-[#F0EDE7] dark:bg-[#222327]"
    >
      <div
        className="relative bg-cover"
        style={{
          backgroundImage: `url('${getStaticURL()}/assets/images/banner.jpg')`,
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <LazyLoad once={true} placeholder={<Loader />}>
          <div className="mx-auto flex max-w-[1504px] flex-col gap-6 font-merriweather xs:p-4 xs:pt-20 lg:mt-20 lg:px-14 lg:py-20 ">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-[#DCD3C9]  px-6 py-5 lg:py-2">
                <div className="flex items-center justify-between">
                  <span>
                    {t("commercialMarketPage.total.title")} {currentToken}
                  </span>
                  <div className="flex rounded-full bg-[#6B0E01] p-[2px] ">
                    <div
                      onClick={() => {
                        setSwap({
                          to: { key: EToken.VPL, value: 0 },
                          from: { key: EToken.USDT, value: 0 },
                        });
                        setCurrentToken(EToken.USDT);
                      }}
                      className={`rounded-full  px-4 py-[5px]  ${
                        from.key === "USDT"
                          ? "bg-[#FECA50] text-[#6B0E01]"
                          : "text-[#fff]"
                      }`}
                    >
                      USDT
                    </div>
                    <div
                      onClick={() => {
                        setSwap({
                          from: { key: EToken.VPL, value: 0 },
                          to: { key: EToken.USDT, value: 0 },
                        });
                        setCurrentToken(EToken.VPL);
                      }}
                      className={`rounded-full  px-4 py-[5px] ${
                        from.key === "VPL"
                          ? "bg-[#FECA50] text-[#6B0E01] "
                          : "text-[#fff]"
                      } `}
                    >
                      VPL
                    </div>
                  </div>
                </div>
                {account ? (
                  <span className="text-[24px] font-bold ">
                    ${convertNumberToFormattedString(balance.toString())}{" "}
                  </span>
                ) : (
                  <ButtonPrimary
                    onClick={() => {
                      document.getElementById("wallet-connect")?.click();
                    }}
                  >
                    {t("commercialMarketPage.connectWallet.button")}
                  </ButtonPrimary>
                )}
              </div>
              <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-[#DCD3C9]  px-6 py-5 lg:py-2">
                <span className="text-[#222]">
                  {t("commercialMarketPage.process.description")}
                </span>
                <div className="flex flex-col">
                  <span className="font text-[#222]">
                    {t("commercialMarketPage.process.title")} ({giftSell}/100)
                  </span>
                  <div className="relative mt-1 h-[24px] w-full overflow-hidden rounded-full border border-[#6B0E01]">
                    <div
                      className="via-opacity-0 absolute h-full w-[50%] rounded-full bg-gradient-to-r from-[red] to-[#6B0E01] "
                      style={{
                        width: `${giftSell}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
              {!!account ? (
                <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-[#DCD3C9] px-6 py-5 lg:py-2">
                  {t("walletAddress")}
                  <div className="relative rounded border border-[#6B0E01]">
                    <input
                      disabled
                      className="bg-transparent px-2 py-1 outline-none"
                      type="text"
                      value={hashAccount}
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(account);
                        onToast(t("copied"), "success");
                      }}
                    >
                      <CopyIcon />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-[#DCD3C9] px-6 py-5 lg:py-2">
                  {t("commercialMarketPage.connectWallet.note")}
                  <ButtonPrimary
                    onClick={() => {
                      document.getElementById("wallet-connect")?.click();
                    }}
                  >
                    {t("commercialMarketPage.connectWallet.button")}
                  </ButtonPrimary>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="flex flex-col justify-between gap-4 rounded-[8px] bg-[#DCD3C9] px-6 py-5 lg:py-2">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-bold">
                    {t("commercialMarketPage.exchangeGifts.title")}
                  </span>
                  <div className="flex items-end gap-4">
                    <div className="flex items-end gap-1">
                      <span>1</span>
                      <GIftIcon />
                    </div>
                    <span>=</span>
                    <div className="">
                      <span>
                        {calcValueBuy(currentToken)} {currentToken}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-4">
                  {!!account ? (
                    <div className="flex w-full flex-col gap-4 ">
                      {giftSell === AVAILABLE_GIFTBOXES ? (
                        <button
                          disabled={giftSell === AVAILABLE_GIFTBOXES}
                          className={`col-span-1 w-full cursor-pointer border bg-opacity-10 px-4 py-2 text-[14px] font-bold ${
                            giftSell === AVAILABLE_GIFTBOXES
                              ? "border-[#A6A6A6] bg-[#C1C1C1] text-[#A6A6A6]"
                              : "hover:scale-102 border-red bg-[#6B0E01] text-[#6B0E01]"
                          } duration-300`}
                        >
                          {t("commercialMarketPage.exchangeGifts.button")}
                        </button>
                      ) : (
                        <Link
                          href="/commercial-market/gift"
                          className="col-span-1 "
                        >
                          <button
                            onClick={() => {
                              // if (giftBoxData?.isUserLocked) {
                              //   onToast(t("youAreLocked"), "error");
                              //   return;
                              // }
                              // setIsOpenMapGift(true);
                            }}
                            className="hover:scale-102 w-full cursor-pointer border border-red bg-[#6B0E01] bg-opacity-10 px-4 py-2 text-[14px] font-bold text-[#6B0E01] duration-300 "
                          >
                            {t("commercialMarketPage.exchangeGifts.button")}
                          </button>
                        </Link>
                      )}
                      <div className="flex w-full gap-4">
                        <button
                          onClick={() => {
                            setIsOpenWheel(true);
                          }}
                          disabled={giftSell < AVAILABLE_GIFTBOXES}
                          className={`w-1/2 cursor-pointer border bg-opacity-10 px-4 py-2 text-[14px] font-bold ${
                            giftSell < AVAILABLE_GIFTBOXES
                              ? "border-[#A6A6A6] bg-[#C1C1C1] text-[#A6A6A6]"
                              : "hover:scale-102 border-red bg-[#6B0E01] text-[#6B0E01]"
                          } duration-300`}
                        >
                          {t("commercialMarketPage.exchangeGifts.buttonReward")}
                        </button>
                        <Link
                          href="/spin-wheel-history"
                          className="w-1/2"
                        >
                          <button
                            onClick={() => {
                              // if (giftBoxData?.isUserLocked) {
                              //   onToast(t("youAreLocked"), "error");
                              //   return;
                              // }
                              // setIsOpenMapGift(true);
                            }}
                            className="flex items-center justify-center hover:scale-102 w-full cursor-pointer border border-red bg-[#6B0E01] bg-opacity-10 px-4 py-2 text-[14px] font-bold text-[#6B0E01] duration-300 "
                          >
                            {t("viewHistory")}
                            <SimpleArrowIcon />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        document.getElementById("wallet-connect")?.click();
                      }}
                      className="hover:scale-102 col-span-1 cursor-pointer border border-red bg-[#6B0E01] bg-opacity-10 px-4 py-2 text-[14px] font-bold text-[#6B0E01] duration-300 "
                    >
                      {t("connectWallet")}
                    </button>
                  )}
                  {giftBoxData?.userGiftbox && !giftBoxData.isUserLocked && (
                    <div className="flex items-center gap-2">
                      <span>
                        {t(
                          "commercialMarketPage.exchangeGifts.currentlyOwning",
                        )}
                      </span>
                      <span className="text-[24px] font-bold text-[#6B0E01]">
                        {giftBoxData?.userGiftbox.completed.length}/5
                      </span>
                    </div>
                  )}
                  {giftBoxData && giftBoxData.isUserLocked && (
                    <span>{t("youAreLocked")}</span>
                  )}
                </div>
                <div>
                  <span className="text-[#BF0D0D]">
                    *{t("commercialMarketPage.exchangeGifts.note")}
                  </span>
                </div>
              </div>
              <Referral account={account} />
            </div>
            <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-[#DCD3C9]  px-6 py-5 lg:py-2">
              <span>
                {t("commercialMarketPage.swap.title", {
                  from: from.key,
                  to: to.key,
                })}
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-end gap-4">
                  <span>1 {from.key}</span>
                  <span>=</span>
                  <span>
                    {exchangeCalculated}&nbsp;{to.key}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 lg:flex-row ">
                  <div className=" flex w-full flex-1 flex-col gap-2 rounded-lg bg-[#FFF5EB] px-2 py-4 ">
                    <span>{from.key}</span>
                    <input
                      id="swap-input"
                      className="rounded bg-transparent py-1 outline-none"
                      onChange={(e) => setUsdtInput(e.target.value)}
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      type="number"
                      min={0}
                      step={1}
                      placeholder="0.0"
                    />
                  </div>
                  <div
                    className="rotate-90 cursor-pointer hover:scale-105 lg:rotate-0"
                    onClick={() => {
                      if (from.key === "USDT") {
                        setSwap({
                          from: { key: EToken.VPL, value: 0 },
                          to: { key: EToken.USDT, value: 0 },
                        });
                        setCurrentToken(EToken.VPL);
                      } else {
                        setSwap({
                          from: { key: EToken.USDT, value: 0 },
                          to: { key: EToken.VPL, value: 0 },
                        });
                        setCurrentToken(EToken.USDT);
                      }
                      document.getElementById("swap-input")?.focus();
                    }}
                  >
                    <ChevronRightIcon />
                  </div>
                  <div className="flex w-full flex-1 flex-col gap-2 rounded-lg bg-[#FFF5EB] px-2 py-4 ">
                    <span>{to.key}</span>
                    <input
                      readOnly
                      className="rounded bg-transparent py-1 outline-none"
                      step={0.0001}
                      value={calcSwap(from.key, Number(usdtInput))}
                      placeholder="0.0"
                    />
                  </div>
                </div>
              </div>
            </div>
            {account && !giftBoxData?.isUserLocked && (
              <HistoryGift
                history={giftBoxData?.userGiftbox?.completed ?? []}
              />
            )}
          </div>
        </LazyLoad>
        <ModalConnectWallet />
        <ModalWheel openModal={isOpenWheel} setOpenModal={setIsOpenWheel} />
      </div>
    </DefaultLayout>
  );
}
