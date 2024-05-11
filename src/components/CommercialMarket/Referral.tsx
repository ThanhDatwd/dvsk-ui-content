import { CopyIcon } from "@/assets/icons/CopyIcon";
import { SimpleArrowIcon } from "@/assets/icons/SimpleArrowIcon";
import { onToast } from "@/hooks/useToast";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { giftboxService } from "@/services/GiftboxService";
import { referralService } from "@/services/ReferralService";
import { convertNumberToFormattedString } from "@/utils/converter";
import { errorMsg } from "@/utils/errorMsg";
import { signMsg } from "@/utils/generateMsg";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import { LoadingSpinner } from "../LoadingSpinner";
import { ButtonPrimary } from "../core/Button";

interface IProps {
  account: string | undefined;
}
declare const window: any;

export const Referral: FC<IProps> = ({ account }) => {
  const { t } = useTranslation();
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [myReferral, setMyReferral] = useState<string>("");
  const [myReferralReward, setMyReferralReward] = useState<number>(0);
  const [refCodeInput, setRefCodeInput] = useState<string>("");
  const [referrerCode, setReferrerCode] = useState<string>("");
  const [referrerReward, setReferrerReward] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingClaimReward, setIsLoadingClaimReward] = useState(false);
  const { connectorName } = useAugmentlabsWalletContext();
  const {
    hook,
    connector: { provider },
  } = useConnectorByName(connectorName);

  useEffect(() => {
    if (account && loaded) {
      fetchMyReferral();
      fetchMyReferralReward();
    }
  }, [account, loaded]);

  const fetchMyReferral = async () => {
    if (!account) return;
    try {
      const tokenRecaptcha = await executeRecaptcha("form_submit");

      const response = await giftboxService.viewMyReferral(
        tokenRecaptcha,
        account,
      );

      if (response.success) {
        setMyReferral(response.data.code);
        setReferrerCode(response.data.referrerCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyReferralReward = async () => {
    if (!account) return;
    try {
      const tokenRecaptcha = await executeRecaptcha("form_submit");

      const response = await referralService.viewMyReferralReward(
        account,
        tokenRecaptcha,
      );

      if (response.success) {
        setMyReferralReward(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyReferrerCode = async (refCode: string) => {
    if (!refCode || !loaded) return;
    try {
      setIsLoading(true);
      const tokenRecaptcha = await executeRecaptcha("form_submit");
      const data = await giftboxService.applyReferralCode(
        tokenRecaptcha,
        account as string,
        refCode,
      );

      if (data.success) {
        onToast(t("applyReferralSuccess"), "success");
        setReferrerCode(refCode);
      } else {
        onToast(t("errorMessages." + errorMsg(data.code)), "error");
      }

      setIsLoading(false);
    } catch (error) {
      onToast(t("applyReferralFailed"), "error");
      setIsLoading(false);
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

  const onClaimReward = async () => {
    if (!loaded) return;
    try {
      setIsLoadingClaimReward(true);
      const signature = await signMessage(
        signMsg.claimReferralReward(account as string),
        account as string,
      );

      const tokenRecaptcha = await executeRecaptcha("form_submit");
      const data = await referralService.claimReferralReward(
        account as string,
        signature,
        tokenRecaptcha,
      );

      if (data.success) {
        await fetchMyReferralReward();
        onToast(t("receiveRewardsFromReferralCodesSuccessful"), "success");
      } else {
        onToast(t("errorMessages." + errorMsg(data.code)), "error");
      }

      setIsLoadingClaimReward(false);
    } catch (error) {
      onToast(t("receiveRewardsFromReferralCodesFailed"), "error");
      setIsLoadingClaimReward(false);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-[8px] bg-[#DCD3C9] px-6 py-5 lg:gap-0 lg:py-2">
      <span className="">{t("commercialMarketPage.referral.title")}</span>
      <span className="mt-4 text-[14px]">
        {t("commercialMarketPage.referral.description")}
      </span>
      {!!account ? (
        <div>
          <div className="mb-4 mt-4 items-center justify-between md:flex md:gap-3">
            <div className="flex w-full flex-col gap-2 md:w-1/2">
              <span className="text-[14px]">
                {t("commercialMarketPage.referral.referralCode")}
              </span>
              <div className="relative h-[42px] w-full rounded border border-[#6B0E01]">
                <input
                  disabled
                  className="h-[42px] bg-transparent px-2 py-1 outline-none"
                  type="text"
                  value={myReferral}
                />
                <div
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(myReferral);
                    onToast(t("copied"), "success");
                  }}
                >
                  <CopyIcon />
                </div>
              </div>
            </div>
            {!referrerCode ? (
              <div className="mt-4 flex w-full flex-col gap-2 md:mt-0 md:w-1/2">
                <span className="text-[14px]">
                  {t("commercialMarketPage.referral.importReferralCode")}
                </span>
                <div className="flex w-full rounded-l rounded-r-lg border border-[#6B0E01]">
                  <input
                    className="w-full bg-transparent px-2 py-1 outline-none"
                    type="text"
                    value={refCodeInput}
                    onChange={(e) => {
                      setRefCodeInput(e.target.value);
                    }}
                  />
                  <ButtonPrimary
                    className="flex w-fit gap-2 whitespace-nowrap rounded-l-none"
                    onClick={() => {
                      applyReferrerCode(refCodeInput);
                    }}
                    disabled={!refCodeInput || isLoading}
                  >
                    {t("confirm")}
                    {isLoading && (
                      <div className="h-6 w-6">
                        <LoadingSpinner />
                      </div>
                    )}
                  </ButtonPrimary>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col gap-2 md:w-1/2">
                <span className="text-[14px]">
                  {t("commercialMarketPage.referral.referrerCode")}
                </span>
                <div className="relative h-[42px] w-full rounded border border-[#6B0E01]">
                  <input
                    disabled
                    className="h-[42px] bg-transparent px-2 py-1 outline-none"
                    type="text"
                    value={referrerCode}
                  />
                  <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(referrerCode);
                      onToast(t("copied"), "success");
                    }}
                  >
                    <CopyIcon />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div>{t("receiveRewardsFromReferralCodes")}</div>
            <div className="relative flex h-[42px] w-full items-center justify-between rounded border border-[#6B0E01]">
              <input
                disabled
                className="h-[42px] max-w-[150px] bg-transparent px-2 py-1 outline-none sm:max-w-full"
                type="text"
                value={convertNumberToFormattedString(
                  myReferralReward.toFixed(2).toString(),
                )}
              />
              <span className="px-2 py-1 text-gray-600">VPL</span>
            </div>
            <div className="items-center justify-between gap-3 md:flex">
              <ButtonPrimary
                className={`flex w-full justify-center gap-2 whitespace-nowrap md:w-1/2 ${
                  myReferralReward === 0
                    ? "bg-[#A99693] !text-[#9E7E78] hover:!scale-100"
                    : ""
                }`}
                onClick={onClaimReward}
                disabled={isLoadingClaimReward || myReferralReward === 0}
              >
                {t("reward")}
                {isLoadingClaimReward && (
                  <div className="h-6 w-6">
                    <LoadingSpinner />
                  </div>
                )}
              </ButtonPrimary>
              <Link
                href="/referral"
                className="mt-2 block w-full md:mt-0 md:w-1/2"
              >
                <button className="hover:scale-102 flex w-full cursor-pointer items-center justify-center gap-1 rounded border border-red bg-[#6B0E01] bg-opacity-10 px-4 py-2 text-[14px] font-bold text-[#6B0E01] duration-300">
                  {t("viewHistory")}
                  <SimpleArrowIcon />
                </button>
              </Link>
            </div>
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
    </div>
  );
};
