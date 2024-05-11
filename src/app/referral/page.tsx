"use client";

import { CopyIcon } from "@/assets/icons/CopyIcon";
import { ModalConnectWallet } from "@/components/ModalConnectWallet";
import { ButtonPrimary } from "@/components/core/Button";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { onToast } from "@/hooks/useToast";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";
import { referralService } from "@/services/ReferralService";
import { getStaticURL } from "@/utils/constants";
import { convertNumberToFormattedString } from "@/utils/converter";
import { ReferralType } from "@/utils/type";
import { DateTime } from "luxon";
import { useReCaptcha } from "next-recaptcha-v3";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Referral() {
  const { t } = useTranslation();
  const { executeRecaptcha } = useReCaptcha();

  useState<boolean>(false);
  const { connectorName } = useAugmentlabsWalletContext();
  const { hook } = useConnectorByName(connectorName);
  const account = hook.useAccount();
  const networkSeleted = hook.useChainId() as E_NETWORK_ID;
  const [referralHistory, setReferralHistory] = useState([]);

  const handleSearch = (value: any) => {
    handleFindCharacter(value);
  };
  const handleFindCharacter = (name: string) => {};

  const hashAccount = useMemo(() => {
    if (account) {
      return `${account.slice(0, 4)}...${account.slice(
        account.length - 4,
        account.length,
      )}`;
    }

    return "";
  }, [account, connectorName]);

  useEffect(() => {
    if (account && networkSeleted) {
      fetchUserNFT();
    }
  }, [account, networkSeleted]);

  const fetchUserNFT = async () => {
    if (!account || !networkSeleted) return;
    const token = await executeRecaptcha("form_submit");
    const referralHistory = await referralService.getReferralHistory(
      account,
      token,
    );

    if (referralHistory.success) {
      setReferralHistory(referralHistory.data);
    }
  };

  const calcPaidAmout = (rewardPercentage: number, amount: number) => {
    return Number(amount * (rewardPercentage / 100)).toFixed(2);
  };

  return (
    <DefaultLayout pageTitle="Dashboard" containerStyle="">
      <div
        className="fixed -z-10 bg-cover"
        style={{
          backgroundImage: `url('${getStaticURL()}/assets/images/banner.jpg')`,
          width: "100vw",
          minHeight: "100vh",
        }}
      />
      <div className="min-h-[100vh] pt-20 xs:px-4 xs:pb-8 md:px-14 md:py-20 lg:pt-40 ">
        <div className="mx-auto flex max-w-[1504px] flex-col xs:gap-4 md:gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex justify-end gap-6 xs:flex-col-reverse xs:items-end md:flex-row">
              {account && (
                <div className="flex items-center gap-[11px] xs:w-full sm:w-fit">
                  <div className="item-center flex w-full justify-center gap-4 border border-red bg-[#DCD3C9] p-2">
                    <div className="relative w-full  border-[#6B0E01]">
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
                </div>
              )}
            </div>
            <div className="block">
              <div className="overflow-auto">
                <table className="w-full min-w-max table-auto border-collapse">
                  <thead className="border border-b-0 border-red bg-[#F0EDE7]">
                    <tr>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.txHash")}
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.commission")} (%)
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.commission")} (VPL)
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.idReferrer")}
                      </th>
                      <th
                        scope="col"
                        className="max-w-[150px] p-2 text-center font-merriweather text-xl  capitalize"
                      >
                        {t("giftBoxNo")}
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.status")}
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.time")}
                      </th>
                    </tr>
                  </thead>
                  {account && referralHistory.length > 0 && (
                    <tbody className=" border border-red bg-white">
                      {referralHistory.map((referral: ReferralType, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-[#E0D6CB]" : "bg-[#D5CABD]"
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-center">{index + 1}</div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center justify-center gap-2 text-center">
                              {referral.payTxHash
                                ? `${referral.payTxHash.slice(0, 5)}...
                              ${referral.payTxHash.slice(
                                referral.payTxHash.length - 5,
                                referral.payTxHash.length,
                              )}`
                                : t("noTransactionHash")}
                              {referral.payTxHash && (
                                <div
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      referral.payTxHash,
                                    );
                                    onToast(t("copied"), "success");
                                  }}
                                >
                                  <CopyIcon />
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-center">
                              {referral.rewardPercentage}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-center">
                              {convertNumberToFormattedString(
                                calcPaidAmout(
                                  referral.rewardPercentage,
                                  referral.amount,
                                ),
                              )}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center justify-center gap-2 text-center">
                              {referral.buyerId.slice(0, 5)}...
                              {referral.buyerId.slice(
                                referral.buyerId.length - 5,
                                referral.buyerId.length,
                              )}
                              <div
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    referral.buyerId,
                                  );
                                  onToast(t("copied"), "success");
                                }}
                              >
                                <CopyIcon />
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center justify-center gap-2 text-center">
                              {referral.giftboxId}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-center">
                              {t(
                                `referralPayoutStatus.${referral.status.replace(
                                  /_([a-z])/g,
                                  function (match, group1) {
                                    return group1.toUpperCase();
                                  },
                                )}`,
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-center">
                              {DateTime.fromISO(referral.updatedAt).toFormat(
                                "dd/MM/yyyy HH:mm",
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
              {account && referralHistory.length == 0 && (
                <div className="flex min-h-[200px] w-full items-center justify-center bg-[#E0D6CB]">
                  <div className="p-2">{t("noData")}</div>
                </div>
              )}
              {!account && (
                <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 border border-red bg-[#E0D6CB]">
                  <div className="p-2 text-center text-xl">
                    {t("pleaseConnectWalletToSeeYourReferral")}
                  </div>
                  <ButtonPrimary
                    onClick={() => {
                      document.getElementById("wallet-connect")?.click();
                    }}
                    className="text-lg md:min-w-[300px]"
                  >
                    {t("commercialMarketPage.connectWallet.button")}
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        </div>
        <ModalConnectWallet />
      </div>
    </DefaultLayout>
  );
}
