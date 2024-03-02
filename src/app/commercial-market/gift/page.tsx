"use client";

import { CopyIcon } from "@/assets/icons/CopyIcon";
import { GIftIcon } from "@/assets/icons/GIftIcon";
import { GIftIconSelected } from "@/assets/icons/GIftIconSelected";
import { GIftIconSold } from "@/assets/icons/GIftIconSold";
import { CountDownCard } from "@/components/CommercialMarket/CountDownCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ModalConnectWallet } from "@/components/ModalConnectWallet";
import Loader from "@/components/common/Loader";
import { Modal } from "@/components/controls/Modal";
import { ButtonPrimary } from "@/components/core/Button";
import { FrameSquart } from "@/components/core/FrameSquart";
import { ImageLoad } from "@/components/core/ImageLoad";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import useTextTranslation from "@/hooks/useTextConvert";
import { onToast } from "@/hooks/useToast";
import { Gift, Giftbox, GiftboxData } from "@/interfaces/Giftbox";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";
import { giftboxService } from "@/services/GiftboxService";
import {
  ACCEPTED_CURRENCY,
  AMOUNT_BUY_GIFT,
  MINIMUM_TX_CONFIRMATION,
  REFECT_CONFIRMATION_BLOCK,
  USDT_TO_VPL_EXCHANGE_RATE,
  getStaticURL,
} from "@/utils/constants";
import {
  convertBalanceDecimalToNumber,
  convertNumberToFormattedString,
} from "@/utils/converter";
import { errorMsg } from "@/utils/errorMsg";
import { signMsg } from "@/utils/generateMsg";
import abiUsdtToken from "@/web3/abi/token.json";
import { useToken } from "@/web3/hooks/useToken";
import { CONTRACT_ADDRESS, EToken, ITokenOption, TOKENS } from "@/web3/token";
import { useFormik } from "formik";
import { useReCaptcha } from "next-recaptcha-v3";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LazyLoad from "react-lazyload";
import { toast } from "react-toastify";
import Web3 from "web3";
import * as Yup from "yup";
import "../../../../i18n";
import { GiftIconLocked } from "@/assets/icons/GifIconLocked";
import { currencyService } from "@/services/CurrencyService";
import i18next from "i18next";

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
export default function PayGift() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number>(AMOUNT_BUY_GIFT);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [isOpenModalGift, setIsOpenModalGift] = useState(false);
  const [boxIsPicked, setBoxIsPicked] = useState<number | null>();
  const [currentToken, setCurrentToken] = useState<EToken>(EToken.USDT);
  const [giftBoxData, setGiftBoxData] = useState<Giftbox>();
  const [boxLocked, setBoxLocked] = useState<Gift | null>();
  const { textRequired } = useTextTranslation();
  const [nftCharacter, setNftCharacter] = useState<GiftboxData | null>(null);
  const [isImportingNFT, setIsImportingNFT] = useState(false);
  const [currencyDex, setCurrencyDex] = useState<number>(
    USDT_TO_VPL_EXCHANGE_RATE,
  );
  const [token, setToken] = useState<ITokenOption>(TokenOptions[0]);

  const { connectorName } = useAugmentlabsWalletContext();
  const {
    hook,
    connector: { provider },
  } = useConnectorByName(connectorName);

  const { getBalance, getDecimals, transferUsdt, importNFT } = useToken();
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
      fetchCurrencyDex();
    }
    const interval = setInterval(getUserStatus, 10000);
    const intervalCurrency = setInterval(fetchCurrencyDex, 10000);
    return () => {
      clearInterval(interval);
      clearInterval(intervalCurrency);
    };
  }, [loaded, account]);

  const fetchCurrencyDex = async () => {
    try {
      const data = await currencyService.getCurrencyDEX();
      if (data && data.pair.priceUsd) {
        setCurrencyDex(Number(data.pair.priceUsd));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        }
        if (response.data.userGiftbox.locked) {
          setBoxLocked(response.data.userGiftbox.locked);
        } else {
          setBoxLocked(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePickBox = (boxId: number) => {
    if (!boxLocked) {
      setBoxIsPicked(boxId);
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

  const calcValueBuy = (token: string) => {
    if (token === EToken.VPL) {
      return amount / currencyDex;
    } else {
      return amount;
    }
  };

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

  const handleBuyGift = async (boxNumber: number) => {
    if (!account) {
      document.getElementById("wallet-connect")?.click();
    }
    try {
      setIsLoading(true);

      if (calcValueBuy(currentToken) > balance) {
        onToast(t("balanceNotEnough"), "error");
        setIsLoading(false);
        return false;
      }

      await transfer(boxNumber);
      setIsLoading(false);
      return true;
    } catch (error: any) {
      setIsLoading(false);
      onToast(t("buyFail"), "error");
      return false;
    }
  };

  const transfer = async (boxNumber: number) => {
    try {
      if (!networkSeleted || !amount) {
        throw new Error("amount or networkSeleted is null");
      }

      toast(`${t("purchase.purchasingAndWaitConfirmation")}`, {
        type: "info",
        autoClose: false,
        closeButton: false,
        theme: "colored",
      });

      const check = await transferUsdt(
        currentToken,
        String(calcValueBuy(currentToken)),
        {
          blocksToWait: MINIMUM_TX_CONFIRMATION,
          interval: REFECT_CONFIRMATION_BLOCK,
        },
      );

      if (check) {
        await fetchTokenBalance();

        const tokenRecaptcha = await executeRecaptcha("form_submit");
        const signature = await signMessage(
          signMsg.buyGiftboxMsg(
            boxNumber,
            account as string,
            check.transactionHash,
          ),
          account as string,
        );
        const res = await giftboxService.buyGift({
          userAddress: account as string,
          boxNumber: boxNumber,
          signature,
          amount: String(calcValueBuy(currentToken)),
          currency: currentToken,
          token: tokenRecaptcha,
          txHash: check.transactionHash,
        });

        if (res.success && res.data.giftboxData) {
          setIsOpenModalGift(true);
          setNftCharacter(res.data.giftboxData);
          onToast(t("purchase.purchasedSuccessful"), "success");
          await getUserStatus();
          return true;
        } else {
          onToast(t(`errorMessages.${errorMsg(res.code)}`), "error");
          throw res;
        }
      }
    } catch (error) {
      onToast(t(`purchase.errorWhenpurchasingToken`), "error");
      throw error;
    } finally {
      toast.dismiss();
    }
  };

  const signMessage = async (
    message: string,
    fromAddress: string,
  ): Promise<string> => {
    const web3 = new Web3(provider as any);

    if (typeof window.web3Connector !== "undefined") {
      web3.setProvider(window.web3Connector);
    }

    return web3.eth.personal.sign(message, fromAddress, "");
  };

  const handleLockGift = async (boxNumber: number) => {
    if (!account) {
      document.getElementById("wallet-connect")?.click();
    }
    try {
      setIsLoading(true);

      if (calcValueBuy(currentToken) > balance) {
        onToast(t("balanceNotEnough"), "error");
        setIsLoading(false);
        return false;
      }

      const signature = await signMessage(
        signMsg.lockGiftboxMsg(boxNumber, account as string),
        account as string,
      );
      const token = await executeRecaptcha("form_submit");
      const response = await giftboxService.lockGift({
        userAddress: account as string,
        boxNumber: boxNumber,
        signature,
        token,
      });
      if (response.success) {
        setBoxIsPicked(null);
        await getUserStatus();
        await handleBuyGift(boxNumber);
      } else {
        setBoxIsPicked(boxNumber);
        onToast(t(`errorMessages.${errorMsg(response.code)}`), "error");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  const handleAddNFT = async (tokenId: string) => {
    setIsImportingNFT(true);
    const result = await importNFT(tokenId);
    if (result) {
      onToast(t("importNFTSuccess"), "success");
      setIsOpenModalGift(false);
    } else {
      onToast(t("importNFTFail"), "error");
    }
    setIsImportingNFT(false);
  };

  const verifyValidation = Yup.object().shape({
    txHash: Yup.string().trim().required(textRequired("transactionHash")),
    boxNumber: Yup.number().required(textRequired("giftBoxNo")),
  });
  const formik = useFormik({
    initialValues: {
      txHash: "",
      boxNumber: null,
    },
    validationSchema: verifyValidation,
    onSubmit: async ({ txHash, boxNumber }) => {
      if (!txHash || !boxNumber || !account) return;
      try {
        setIsLoadingVerify(true);
        const token = await executeRecaptcha("form_submit");
        const signature = await signMessage(
          signMsg.buyGiftboxMsg(boxNumber, account as string, txHash),
          account as string,
        );
        const res = await giftboxService.buyGift({
          userAddress: account as string,
          boxNumber,
          signature,
          amount: String(calcValueBuy(currentToken)),
          currency: currentToken,
          token,
          txHash,
        });
        if (res.success && res.data.giftboxData) {
          setIsOpenModalGift(true);
          setNftCharacter(res.data.giftboxData);
          onToast(t("purchase.purchasedSuccessful"), "success");
          await fetchTokenBalance();
          await getUserStatus();
        } else {
          onToast(t(`errorMessages.${errorMsg(res.code)}`), "error");
        }
        setIsLoadingVerify(false);
      } catch (error) {
        setIsLoadingVerify(false);
        onToast(t("verifyFailed"), "error");
      }
    },
  });

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
        <div className="mx-auto flex max-w-[1504px] flex-col gap-6 font-merriweather xs:p-4 xs:pt-20 lg:mt-20 lg:flex-row lg:py-20">
          <div className="h-full max-h-[100vw] min-h-[600px] max-w-[100vw] overflow-auto px-3 md:h-fit lg:w-1/2">
            <FrameSquart>
              <LazyLoad
                className="justify-center lg:flex"
                placeholder={
                  <div className="h-[500px] w-[500px]">
                    <Loader />
                  </div>
                }
              >
                <div className="flex h-[500px] w-[500px] flex-wrap">
                  {giftBoxData &&
                    Array(100)
                      .fill("")
                      .map((value, index) => {
                        return (
                          <div
                            key={index}
                            className="w-1/10 h-1/10 relative flex items-center justify-center"
                            onClick={() => {
                              if (!account) {
                                document
                                  .getElementById("wallet-connect")
                                  ?.click();
                                return;
                              }
                              giftBoxData?.giftboxStatuses?.available.includes(
                                index + 1,
                              ) && handlePickBox(index + 1);
                            }}
                          >
                            {boxLocked?.id === index + 1 ? (
                              <div>
                                <GIftIconSelected />
                              </div>
                            ) : boxIsPicked === index + 1 ? (
                              <div>
                                <GIftIconSelected />
                              </div>
                            ) : (
                              <div>
                                {giftBoxData.giftboxStatuses.available.includes(
                                  index + 1,
                                ) && <GIftIcon />}
                                {giftBoxData.giftboxStatuses.completed.includes(
                                  index + 1,
                                ) && <GIftIconSold />}
                                {giftBoxData.giftboxStatuses.locked.includes(
                                  index + 1,
                                ) && (
                                  <div className="brightness-50">
                                    <GIftIcon />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                </div>
                {/* {boxLocked && (
                  <div className="w-full text-center text-red">
                    {t("pleasePayBeforeContinue")}
                  </div>
                )} */}
              </LazyLoad>
            </FrameSquart>
          </div>

          <div className="flex flex-col gap-4 lg:w-1/2 ">
            <div className="grid w-full grid-cols-3 gap-4 ">
              <div className="col-span-3 w-full  md:col-span-1">
                <CountDownCard
                  onTimeUp={() => {
                    getUserStatus();
                    setIsLoading(false);
                  }}
                  boxNumber={boxIsPicked}
                  startDate={boxLocked?.lockedAt ?? ""}
                  isBlocked={giftBoxData?.isUserLocked}
                />
              </div>
              <div className="col-span-3 w-full md:col-span-2">
                <div className="flex h-full w-full flex-wrap rounded-lg bg-[#DCD3C9] p-6 dark:bg-primaryDark">
                  <div className="flex w-1/2 items-center justify-between px-2 pr-6">
                    <p className="mb-0 mt-3">{t("locked")}</p>
                    <GiftIconLocked />
                  </div>
                  <div className="flex w-1/2 items-center justify-between px-2 pl-6">
                    <p className="mb-0 mt-3">{t("notSoldYet")}</p>
                    <GIftIcon />
                  </div>
                  <div className="flex w-1/2 items-center justify-between px-2 pr-6">
                    <p className="mb-0 mt-3">{t("sold")}</p>
                    <GIftIconSold />
                  </div>
                  <div className="flex w-1/2 items-center justify-between px-2 pl-6">
                    <p className="mb-0 mt-3">{t("selectingGiftbox")}</p>
                    <GIftIconSelected />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
              <div className=" flex w-full flex-col gap-3 rounded-lg bg-[#DCD3C9] p-6 ">
                <span>
                  {t("commercialMarketPage.total.title")} {currentToken}
                </span>

                <span className="text-[24px] font-bold ">
                  ${convertNumberToFormattedString(balance.toString())}{" "}
                </span>
              </div>
              <div className="w-full ">
                <div className="flex h-full w-full flex-wrap rounded-lg bg-[#DCD3C9] p-6 dark:bg-primaryDark">
                  {!!account ? (
                    <div className="flex w-full flex-col gap-4 rounded-[8px] bg-[#DCD3C9]">
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
                    <div className="flex w-full flex-col justify-center gap-4 rounded-[8px] bg-[#DCD3C9]">
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
              </div>
              <div className="w-full ">
                <div className="flex h-full w-full flex-wrap rounded-lg bg-[#DCD3C9] p-6 dark:bg-primaryDark">
                  <div className="flex w-full flex-col gap-2">
                    <span>{t("bought")}:</span>
                    {giftBoxData?.userGiftbox && !giftBoxData.isUserLocked && (
                      <span className="text-[24px] font-bold text-[#6B0E01]">
                        {giftBoxData?.userGiftbox.completed.length}/5
                      </span>
                    )}
                  </div>
                  {giftBoxData && giftBoxData.isUserLocked && (
                    <span>{t("youAreLocked")}</span>
                  )}
                </div>
              </div>
            </div>
            {account && (
              <div className="flex w-full flex-col gap-4">
                <div className="h-fit w-full ">
                  <div className="flex h-full w-full flex-col flex-wrap rounded-lg bg-[#DCD3C9] p-6 dark:bg-primaryDark">
                    <div className="mb-4 flex w-fit rounded-full bg-[#6B0E01] p-[2px] ">
                      <div
                        onClick={() => {
                          setCurrentToken(EToken.USDT);
                        }}
                        className={`rounded-full  px-4 py-[5px]  ${
                          currentToken === "USDT"
                            ? "bg-[#FECA50] text-[#6B0E01]"
                            : "text-[#fff]"
                        }`}
                      >
                        USDT
                      </div>
                      <div
                        onClick={() => {
                          setCurrentToken(EToken.VPL);
                        }}
                        className={`rounded-full  px-4 py-[5px] ${
                          currentToken === "VPL"
                            ? "bg-[#FECA50] text-[#6B0E01] "
                            : "text-[#fff]"
                        } `}
                      >
                        VPL
                      </div>
                    </div>
                    {!!boxIsPicked || !!boxLocked ? (
                      <div className="flex w-full  flex-col justify-center gap-4">
                        <div className="flex items-center justify-between ">
                          <div className="flex items-center gap-3">
                            <div>
                              <GIftIcon />
                            </div>
                            <div className=" flex flex-col justify-start text-left  ">
                              <div>
                                {t("giftBoxNo")}:{" "}
                                {boxLocked ? boxLocked.id : boxIsPicked}
                              </div>
                            </div>
                          </div>
                        </div>
                        {(boxIsPicked || boxLocked) && (
                          <ButtonPrimary
                            onClick={() => {
                              if (giftBoxData?.isUserLocked) {
                                onToast(t("youAreLocked"), "error");
                                return;
                              }
                              if (boxLocked) {
                                handleBuyGift(boxLocked?.id);
                                return;
                              }
                              if (boxIsPicked) {
                                handleLockGift(boxIsPicked);
                                return;
                              }
                            }}
                            className={isLoading ? "cursor-not-allowed" : ""}
                            disabled={isLoading}
                          >
                            <div className="flex items-center justify-center gap-2">
                              {boxLocked
                                ? t(isLoading ? "paying" : "pay")
                                : t(isLoading ? "paying" : "buy")}
                              {isLoading && (
                                <div className="h-6 w-6">
                                  <LoadingSpinner />
                                </div>
                              )}
                            </div>
                          </ButtonPrimary>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-3">
                          <div>
                            <GIftIcon />
                          </div>
                          <div className=" flex flex-col justify-start text-left  ">
                            <div>{t("pleaseChooseGiftBox")}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-fit w-full ">
                  <div className="flex h-full w-full flex-wrap rounded-lg bg-[#DCD3C9] p-6 dark:bg-primaryDark">
                    <div className="flex w-full flex-col justify-between gap-3 ">
                      <div className="flex items-center gap-3">
                        <div className=" flex flex-col justify-start text-left font-bold ">
                          <div>{t("verifyTransaction")}</div>
                        </div>
                      </div>
                      <form
                        className="mb-3 flex w-full flex-col gap-2"
                        onSubmit={formik.handleSubmit}
                      >
                        <label htmlFor="boxNumber">{t("giftBoxNo")}:</label>
                        <input
                          name="boxNumber"
                          type="number"
                          min={1}
                          max={100}
                          id="boxNumber"
                          onChange={formik.handleChange}
                          className="w-full rounded border border-[#6B0E01] bg-transparent px-2 py-1 outline-none "
                        />

                        <label htmlFor="txHash">{t("transactionHash")}:</label>
                        <input
                          name="txHash"
                          id="txHash"
                          onChange={formik.handleChange}
                          className="w-full rounded border border-[#6B0E01] bg-transparent px-2 py-1 outline-none "
                        />
                      </form>
                      <ButtonPrimary
                        onClick={() => {
                          formik.submitForm();
                        }}
                        className={isLoadingVerify ? "cursor-not-allowed " : ""}
                        disabled={isLoadingVerify}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {t(isLoadingVerify ? "verifying" : "verify")}
                          {isLoadingVerify && (
                            <div className="h-6 w-6">
                              <LoadingSpinner />
                            </div>
                          )}
                        </div>
                      </ButtonPrimary>
                      {formik.errors.boxNumber && (
                        <p className="mb-1 text-xs text-[#E53E3E]">
                          {formik.errors.boxNumber}
                        </p>
                      )}
                      {formik.errors.txHash && (
                        <p className="mb-1 text-xs text-[#E53E3E]">
                          {formik.errors.txHash}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <ModalConnectWallet />
        {nftCharacter && (
          <Modal
            isOpen={isOpenModalGift}
            titleModal={""}
            toggleOpenModal={() => {
              setIsOpenModalGift(!isOpenModalGift);
            }}
            className="bg-transparent shadow-none"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-[24px] font-extrabold text-[#BF0D0D]">
                {t("congratulations")}
              </span>
              <span className="text-[32px] font-black text-[#000]">
                {t("youHaveOpened")} {nftCharacter.metadata.name}
              </span>
              <div>
                <ImageLoad
                  url={nftCharacter.metadata.image}
                  width={220}
                  height={44}
                  alt={nftCharacter.metadata.name}
                />
              </div>
              <div className="block lg:hidden mt-5 text-sm italic">
                *{i18next.t("sentNFTToYou")}
              </div>
              <div className="hidden lg:block">
              <div className="max-w-[300px] text-center italic">
                *{t("nftTransferSuccess")}
              </div>
                <ButtonPrimary
                  onClick={() => {
                    handleAddNFT(String(nftCharacter.tokenId));
                  }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-center gap-2">
                    {t("addNFT")}
                    {isImportingNFT && (
                      <div className="h-6 w-6">
                        <LoadingSpinner />
                      </div>
                    )}
                  </div>
                </ButtonPrimary>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DefaultLayout>
  );
}
