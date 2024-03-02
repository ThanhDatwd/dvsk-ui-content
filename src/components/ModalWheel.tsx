"use client";

import { useTheme } from "@/hooks/useTheme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "./controls/Modal";
import Web3 from "web3";
import LuckyWheel from "./LuckyWheel";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { signMsg } from "@/utils/generateMsg";
import { useReCaptcha } from "next-recaptcha-v3";
import { errorMsg } from "@/utils/errorMsg";
import { onToast } from "@/hooks/useToast";
import { giftboxService } from "@/services/GiftboxService";
import { normalizeTokenDecimal } from "@/utils/bigNumber";
import { convertBalanceDecimalToNumber } from "@/utils/converter";
import { ButtonPrimary } from "./core/Button";
import Link from "next/link";
import { getStaticScanUrl } from "@/utils/constants";

export interface Option {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
  value: number;
}

const data: Option[] = [
  {
    option: "JACKPOT",
    style: { backgroundColor: "#8E0105", textColor: "white" },
    value: 3000,
  },
  {
    option: "NO REWARD",
    style: { backgroundColor: "#FFA451", textColor: "black" },
    value: 0,
  },
  {
    option: "500USDT",
    style: { backgroundColor: "#8E0105", textColor: "white" },
    value: 500,
  },
  {
    option: "NO REWARD",
    style: { backgroundColor: "#FFA451", textColor: "black" },
    value: 0,
  },
  {
    option: "80USDT",
    style: { backgroundColor: "#8E0105", textColor: "white" },
    value: 80,
  },
  {
    option: "NO REWARD",
    style: { backgroundColor: "#FFA451", textColor: "black" },
    value: 0,
  },
  {
    option: "1500USDT",
    style: { backgroundColor: "#8E0105", textColor: "white" },
    value: 1500,
  },
  {
    option: "NO REWARD",
    style: { backgroundColor: "#FFA451", textColor: "black" },
    value: 0,
  },
  {
    option: "80USDT",
    style: { backgroundColor: "#8E0105", textColor: "white" },
    value: 80,
  },
  {
    option: "NO REWARD",
    style: { backgroundColor: "#FFA451", textColor: "black" },
    value: 0,
  },
  {
    option: "500USDT",
    style: { backgroundColor: "#8E0105", textColor: "white" },
    value: 500,
  },
  {
    option: "NO REWARD",
    style: { backgroundColor: "#FFA451", textColor: "black" },
    value: 0,
  },
];
declare const window: any;

export const ModalWheel = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [openModalResult, setOpenModalResult] = useState<boolean>(false);
  const { connectorName } = useAugmentlabsWalletContext();
  const {
    hook,
    connector: { provider },
  } = useConnectorByName(connectorName);
  const account = hook.useAccount();
  const [result, setResult] = useState<number | null>(null);
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [canCloseModal, setCanCloseModal] = useState<boolean>(true);
  const [txHash, setTxHash] = useState<string>("");

  const toggleOpenModal = () => {
    setOpenModal(!openModal);
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

  const handleSpin = async () => {
    if (!account) {
      document.getElementById("wallet-connect")?.click();
    }
    try {
      setCanCloseModal(false);
      const signature = await signMessage(
        signMsg.spinLuckyWheel(account as string),
        account as string,
      );
      const token = await executeRecaptcha("form_submit");
      const response = await giftboxService.spinWheel({
        userAddress: account as string,
        signature,
        token,
      });
      if (response.success) {
        setTxHash(response.data.txHash);
        const resultIndex = data.findIndex(
          (item) =>
            item.value ===
            Number(convertBalanceDecimalToNumber(response.data.amount, 18)),
        );

        setResult(resultIndex);

        return resultIndex + 1;
      } else {
        onToast(t(`errorMessages.${errorMsg(response.code)}`), "error");
        setCanCloseModal(true);
        return null;
      }
    } catch (error) {
      setCanCloseModal(true);
      onToast(t(`errorMessages.unknownError`), "error");

      return null;
    }
  };

  return (
    <>
      <div
        id="wallet-connect"
        className="font-merriweather"
        onClick={() => {
          setOpenModal(!openModal);
        }}
      />

      <Modal
        isOpen={openModal}
        titleModal={""}
        toggleOpenModal={() => {
          if (!canCloseModal) {
            onToast(t("pleaseDoNotExit"), "warning");
            return;
          }
          toggleOpenModal();
        }}
        className="bg-transparent shadow-none "
      >
        <div className="flex min-h-[300px] justify-center md:min-w-[800px]">
          <LuckyWheel
            data={data}
            onFinished={() => {
              setOpenModalResult(true);
              setCanCloseModal(true);
            }}
            getResult={handleSpin}
          />
        </div>
        {/* <div className="mt-5 text-red">{t("turnRemaining")}: 5 </div> */}
      </Modal>
      {result && (
        <Modal
          isOpen={openModalResult}
          titleModal={""}
          toggleOpenModal={() => {
            setOpenModalResult(!openModalResult);
          }}
          className="bg-transparent shadow-none transition duration-300 ease-in-out"
        >
          <span className="flex flex-col items-center justify-center gap-4 text-[24px] font-bold text-[#6B0E01]">
            <div>{data[result ?? 0].option}</div>
            {txHash && (
              <Link
                className="hover:scale-102 cursor-pointer rounded-md bg-red px-4 py-2 text-[17px] text-white duration-300"
                href={`${getStaticScanUrl()}/${txHash}`}
                target="_blank"
              >
                {t("view")}
              </Link>
            )}
          </span>
        </Modal>
      )}
    </>
  );
};
