"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { ArrowBottomIcon } from "@/assets/icons/ArrowBottomIcon";
import { ClockIcon } from "@/assets/icons/ClockIcon";
import { ProgressIcon } from "@/assets/icons/ProgressIcon";
import { TimerIcon } from "@/assets/icons/TimerIcon";
import { useTheme } from "@/hooks/useTheme";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";
import {
  DateRange,
  HardCap,
  StartDate,
  calculateTimeRemaining,
  endsInTimer,
  getStaticURL,
} from "@/utils/constants";
import {
  convertBalanceDecimalToNumber,
  convertNumberToBalanceDecimal,
  convertNumberToFormattedString,
  isGreaterOrEqual,
} from "@/utils/converter";
import { isDarkTheme } from "@/utils/theme";
import { DataSectionProps } from "@/utils/type";
import contractJson from "@/web3/abi/VinachainPoint.json";
import abiUsdtToken from "@/web3/abi/usdt.json";
import { useToken } from "@/web3/hooks/useToken";
import { CONTRACT_ADDRESS, EToken, ITokenOption, TOKENS } from "@/web3/token";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CardInfo } from "./CardInfo";
import { useSearchParams } from "next/navigation";
import { onToast } from "@/hooks/useToast";

const TokenOptions: ITokenOption[] = [
  {
    name: TOKENS.USDT.name,
    value: EToken.USDT,
    image: `${getStaticURL()}/assets/images/liquidity/${TOKENS.USDT.image}`,
    abi: abiUsdtToken,
    address: "",
  },
];
export const TokenCard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");
  const [balancePoint, setBalancePoint] = useState<number>();
  const [totalSupplyBalance, setTotalSupplyBalance] = useState<number>(0);
  const [percentOfProgress, setTotalSupply2Balance] = useState<number>(0);
  const [referrer, setReferrer] = useState<string>();
  const { days } = calculateTimeRemaining(
    DateTime.fromFormat(StartDate, "dd/MM/yyyy")
      .plus({ days: DateRange })
      .toISO({ includeOffset: false }) as string,
  );
  const { connectorName } = useAugmentlabsWalletContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<ITokenOption>(TokenOptions[0]);
  const searchParams = useSearchParams();

  const refCode = searchParams.get("refCode");

  const {
    getBalance,
    getDecimals,
    checkAllowance,
    approve,
    purchase,
    getReferrer,
    totalSupplyNotConnectWallet,
    decimalNotConnectWallet,
  } = useToken();
  const { hook, connector } = useConnectorByName(connectorName);
  const networkSeleted = hook.useChainId() as E_NETWORK_ID;
  const account = hook.useAccount();

  const hashAccount = useMemo(() => {
    if (account) {
      return `${account.slice(0, 4)}...${account.slice(
        account.length - 4,
        account.length,
      )}`;
    }

    return "";
  }, [account, connectorName]);

  const progressData: DataSectionProps[] = [
    {
      label: t("progress"),
      value: t("inProgress"),
      keyIcon: <ProgressIcon color={isDarkTheme(theme) ? "#FAFAFA" : "#333"} />,
    },
    {
      label: t("minimum"),
      value: "100 USDT",
      keyIcon: (
        <ArrowBottomIcon color={isDarkTheme(theme) ? "#FAFAFA" : "#333"} />
      ),
    },
    {
      label: t("time"),
      value: `${DateTime.fromFormat(StartDate, "dd/MM/yyyy").toFormat(
        "LLL dd",
      )} - ${DateTime.fromFormat(StartDate, "dd/MM/yyyy")
        .plus({ days: DateRange })
        .toFormat("LLL dd, yyyy")}`,
      keyIcon: <ClockIcon color={isDarkTheme(theme) ? "#FAFAFA" : "#333"} />,
    },
  ];

  useEffect(() => {
    getBalanceOfToken();
  }, [account, networkSeleted]);

  useEffect(() => {
    getTotalSupply();
  }, []);

  const getTotalSupply = async () => {
    const address = CONTRACT_ADDRESS.VINACHAIN[networkSeleted] as string;
    let totalSupplyInitial = 0;

    const decimal = await decimalNotConnectWallet();

    const totalSupplyBalanceDecimal = await totalSupplyNotConnectWallet();

    totalSupplyInitial = Number(
      convertBalanceDecimalToNumber(totalSupplyBalanceDecimal, decimal),
    );
    setTotalSupplyBalance(totalSupplyInitial);

    if (totalSupplyInitial !== 0) {
      const percentage = (totalSupplyInitial / HardCap) * 100;
      setTotalSupply2Balance(percentage);
    } else {
      setTotalSupply2Balance(0);
    }
  };

  const getBalanceOfToken = async () => {
    if (!account || !networkSeleted) return;

    setToken({
      ...token,
      address: CONTRACT_ADDRESS[EToken.USDT][networkSeleted],
    });
    let balanceConvert = 0;

    const address = CONTRACT_ADDRESS.VINACHAIN[networkSeleted] as string;
    const decimal = await getDecimals(address, contractJson);
    const balance = await getBalance(address, contractJson);
    balanceConvert = Number(convertBalanceDecimalToNumber(balance, decimal));
    setBalancePoint(balanceConvert);

    const referrerAddress = await getReferrer();
    setReferrer(referrerAddress);
  };

  const handlePurchase = async () => {
    if (!account) {
      document.getElementById("wallet-connect")?.click();
    } else {
      if (refCode && refCode !== referrer) {
        onToast(t("referrerNotMatch"), "error");
        return;
      }
      try {
        setLoading(true);
        const check = await checkAllowanceAndApprove();
        if (!check) {
          return;
        }
        await purchasePoints();
      } catch (error: any) {
        setLoading(false);
      }
    }
  };

  const checkAllowanceOfToken = async (ammout: string): Promise<boolean> => {
    const fnPromiseCheckAllowance = () =>
      new Promise<string>(async (resolve, reject) => {
        if (!networkSeleted || !ammout)
          return reject("ammout or networkSeleted is null");
        try {
          const allowance = await checkAllowance(token.address, token.abi);
          const decimal = await getDecimals(token.address, token.abi);
          const allowanceConvert = convertBalanceDecimalToNumber(
            allowance,
            decimal,
          );
          resolve(allowanceConvert);
        } catch (error) {
          reject(error);
        }
      });
    try {
      const allowance = await toast.promise(fnPromiseCheckAllowance, {
        pending: t("checkingAllowance") + "...",
        success: t("checkedAllowance") || "",
        error: t("errorWhenCheckingAllowance"),
      });
      const checkAllowanceGreaterThanAmount = isGreaterOrEqual(
        allowance,
        ammout,
      );
      return checkAllowanceGreaterThanAmount;
    } catch {
      return false;
    }
  };

  const checkAllowanceAndApprove = async (): Promise<boolean> => {
    if (!amount) throw new Error("amount is null");
    const fnPromiseCheckAllowance = () =>
      new Promise<boolean>(async (resolve, reject) => {
        try {
          let checkFrom = false;
          do {
            checkFrom = await checkAllowanceOfToken(amount.toString());
            if (!checkFrom) {
              await approve(token.address, token.abi);
              checkFrom = await checkAllowanceOfToken(amount.toString());
            }
          } while (!checkFrom);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    try {
      await toast.promise(fnPromiseCheckAllowance, {
        pending: t("checkingAndApprovingToken") + "...",
        success: t("checkedAndApprovedToken") || "",
        error: t("errorWhenCheckingAndApprovingToken"),
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const purchasePoints = async (): Promise<boolean> => {
    const fnPromise = () =>
      new Promise(async (resolve, reject) => {
        if (!networkSeleted || !amount)
          return reject("amount or networkSeleted is null");
        try {
          toast(`${t("purchasingAndWaitConfirmation")}`, {
            type: "info",
            autoClose: false,
            closeButton: false,
            theme: "colored",
          });
          const decimal = await getDecimals(token.address, token.abi);
          let amountDecimal = convertNumberToBalanceDecimal(
            amount.toString(),
            decimal,
          );

          const check = await purchase(
            amountDecimal.toString(),
            refCode as string,
          );
          if (check) {
            getBalanceOfToken();
            getTotalSupply();
            resolve(check);
          } else {
            reject(check);
          }

          toast.dismiss();
        } catch (error) {
          reject(error);
          toast.dismiss();
        }
      });
    try {
      await toast.promise(fnPromise, {
        pending: t("purchasingToken") + "...",
        success: t("purchasedSuccessful") || "",
        error: t("errorWhenpurchasingToken"),
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-primary dark:bg-primaryDark rounded-lg p-2 md:p-6 min-h-[500px]">
      <div className="flex gap-2">
        <div className="w-20 h-20 bg-white rounded-full overflow-hidden flex justify-center items-center">
          <Image
            src={`${getStaticURL()}/assets/images/${
              isDarkTheme(theme) ? "logo-bg-orange" : "logo-bg-blue"
            }.svg`}
            alt="metamask"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base text-[#333] dark:text-[#FAFAFA]">
            {t("vinaChainToken")}
          </p>
          <p className="text-sm text-[#333] dark:text-[#FAFAFA] capitalize">
            {t("preSale")}
          </p>
          <div className="flex w-fit items-center gap-1 px-2 py-1 border border-secondary dark:border-[#f8dcc8] rounded-[100px]">
            <div className="w-2 h-2 bg-secondary dark:bg-secondaryDark rounded-full" />
            <p className="text-xs font-medium text-secondary dark:text-secondaryDark">
              {t("inProgress")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-xs text-[#333] dark:text-[#FAFAFA]">
            {`${t("finishedIn")} ${days} ${t("days")}`}
          </p>
          <p className="text-xs text-[#333] dark:text-[#FAFAFA]">
            {`${t("progress")}(${percentOfProgress}%)`}
          </p>
        </div>
        <div className="h-2 w-full bg-white rounded-[100px]">
          <div
            className={`h-2 bg-secondary dark:bg-secondaryDark rounded-[100px]`}
            style={{
              width: `${percentOfProgress}%`,
            }}
          />
        </div>
        <div className="flex justify-between">
          <p className="text-xs text-[#333] dark:text-[#FAFAFA]">
            {totalSupplyBalance} USDT
          </p>
          <p className="text-xs text-[#333] dark:text-[#FAFAFA]">
            {convertNumberToFormattedString(String(HardCap))} USDT
          </p>
        </div>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handlePurchase();
        }}
      >
        <div className="flex justify-between ">
          <p className="text-base text-[#333] dark:text-[#FAFAFA]">
            {t("amount")}
          </p>
          {account && (
            <p className="text-sm text-secondary dark:text-secondaryDark">
              {t("vinaPoints")}: {balancePoint}
            </p>
          )}
        </div>
        <div className="flex relative justify-between border border-secondary dark:border-secondaryDark px-4 py-2 rounded-lg text-base">
          <input
            placeholder="100"
            value={amount}
            step="0.001"
            min={100}
            type="number"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="flex-1 bg-transparent outline-none border-none text-secondary dark:text-secondaryDark"
          />
          <p className="absolute right-2 bottom-2 text-secondary dark:text-secondaryDark">
            USDT
          </p>
        </div>
        <div className="flex relative justify-between rounded-lg text-base">
          <p className="text-sm dark:text-white">
            *{t("theAmountMustBeGreaterThanOrEqualTo100")}
          </p>
        </div>
        <div className="flex justify-between flex-row-reverse w-full items-end">
          <button className="whitespace-nowrap btn-primary border-none bg-secondary dark:bg-secondaryDark text-[#FAFAFA]  rounded-[100px]">
            {t("buyTokenBtn")}
          </button>
          {!account ? (
            <button
              type="submit"
              className="whitespace-nowrap btn-primary border-none bg-[#7e91f1] dark:bg-[#7b3f16] text-[#FAFAFA] hover:bg-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("wallet-connect")?.click();
              }}
            >
              {t("connectWalletBtn")}
            </button>
          ) : (
            <div className="text-secondary dark:text-secondaryDark">
              Address:&nbsp;{hashAccount}
            </div>
          )}
        </div>
      </form>
      <CardInfo
        data={progressData}
        textSize="text-[10px] lg:text-xs"
        containerStyle="w-full bg-transparent dark:bg-transparent p-0"
        itemWrapperStyle="gap-2"
      />
    </div>
  );
};
