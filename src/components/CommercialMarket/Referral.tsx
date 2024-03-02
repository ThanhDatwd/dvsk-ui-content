import { CopyIcon } from "@/assets/icons/CopyIcon";
import { onToast } from "@/hooks/useToast";
import { giftboxService } from "@/services/GiftboxService";
import { useReCaptcha } from "next-recaptcha-v3";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "../core/Button";
import { errorMsg } from "@/utils/errorMsg";
import { LoadingSpinner } from "../LoadingSpinner";

interface IProps {
  account: string | undefined;
}
export const Referral: FC<IProps> = ({ account }) => {
  const { t } = useTranslation();
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [myReferral, setMyReferral] = useState<string>("");
  const [refCodeInput, setRefCodeInput] = useState<string>("");
  const [referrerCode, setReferrerCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (account && loaded) {
      fetchMyReferral();
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
        if (response.data.referrerCode) {
          setReferrerCode(response.data.referrerCode);
        }
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

  return (
    <div className="flex flex-col justify-between rounded-[8px] bg-[#DCD3C9] px-6 py-5 lg:gap-0 lg:py-2">
      <span className="">{t("commercialMarketPage.referral.title")}</span>
      <span className="mt-4 text-[14px]">
        {t("commercialMarketPage.referral.description")}
      </span>
      {!!account ? (
        <div className=" mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[14px]">
              {t("commercialMarketPage.referral.referralCode")}
            </span>
            <div className="relative rounded border border-[#6B0E01]">
              <input
                disabled
                className="bg-transparent px-2 py-1 outline-none"
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
            <div className="flex flex-col gap-2">
              <span className="text-[14px]">
                {t("commercialMarketPage.referral.importReferralCode")}
              </span>
              <div className="flex w-full gap-4">
                <input
                  className="w-full rounded border border-[#6B0E01] bg-transparent px-2 py-1 outline-none"
                  type="text"
                  value={refCodeInput}
                  onChange={(e) => {
                    setRefCodeInput(e.target.value);
                  }}
                />
                <ButtonPrimary
                  className="flex w-fit gap-2 whitespace-nowrap"
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
            <div className="flex flex-col gap-2">
              <span className="text-[14px]">
                {t("commercialMarketPage.referral.referrerCode")}
              </span>
              <div className="relative rounded border border-[#6B0E01]">
                <input
                  disabled
                  className="bg-transparent px-2 py-1 outline-none"
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
