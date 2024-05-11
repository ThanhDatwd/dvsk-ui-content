"use client";

import { useTheme } from "@/hooks/useTheme";
import { onToast } from "@/hooks/useToast";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { luckySpinService } from "@/services/SpinService";
import { getStaticScanUrl } from "@/utils/constants";
import { convertBalanceDecimalToNumber } from "@/utils/converter";
import { errorMsg } from "@/utils/errorMsg";
import { signMsg } from "@/utils/generateMsg";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import LuckyWheel from "./LuckyWheel";
import { Modal } from "./controls/Modal";
import { ButtonPrimary } from "./core/Button";
import { SimpleArrowIcon } from "@/assets/icons/SimpleArrowIcon";

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
      const response = await luckySpinService.spinWheel({
        userAddress: account as string,
        signature,
        token,
      });
      if (response.success) {

        let resultIndex;
        switch (response.data.amount) {
          case "80":
            resultIndex = 4;
            setResult(4);
            break;
          case "500":
            resultIndex = 2;
            setResult(2);
            break;
          case "1500":
            resultIndex = 0;
            setResult(0);
            break;
          default:
            resultIndex = 1;
            setResult(1);
            break;
        }
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
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-[24px] font-extrabold text-[#BF0D0D]">
                {t("congratulations")}
              </span>
              <div>
                <span className="text-[32px] font-black text-[#000]">
                  {t("youHaveOpened")}
                </span>
                <div>{data[result ?? 0].option}</div>
              </div>
              <div className="mt-4 hidden lg:block">
                <Link href="/spin-wheel-history" className="w-1/2">
                  <button className="hover:scale-102 flex w-full cursor-pointer items-center justify-center border border-red bg-[#6B0E01] bg-opacity-10 px-4 py-2 text-[14px] font-bold text-[#6B0E01] duration-300 ">
                    {t("viewHistory")}
                    <SimpleArrowIcon />
                  </button>
                </Link>
              </div>
            </div>
          </span>
        </Modal>
      )}
    </>
  );
};
