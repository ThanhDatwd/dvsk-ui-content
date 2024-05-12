"use client";

import { useState } from "react";
import { Modal } from "./controls/Modal";
import { useTranslation } from "react-i18next";
import { chooseTheme } from "@/utils/theme";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { getStaticURL } from "@/utils/constants";
import {
  E_CONNECTOR_NAMES,
  E_NETWORK_ID,
} from "@/pkgs/augmentlab-wallet-connector/types";
import { connectWallet } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { ConnectSuccessIcon } from "@/assets/icons/ConnectSuccessIcon";
import { ClockIcon } from "@/assets/icons/ClockIcon";
import { CloseIcon } from "@/assets/icons/CloseIcon";

export const ModalConnectWallet = () => {
  const [openModalConnectWallet, setOpenModalConnectWallet] =
    useState<boolean>(false);
  const [openModalConnectSuccess, setOpenModalConnectSuccess] =
    useState<boolean>(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { connectorName, setConnectorName, walletNetwork, setWalletNetwork } =
    useAugmentlabsWalletContext();
  const toggleOpenModalConnectWallet = () => {
    setOpenModalConnectWallet(!openModalConnectWallet);
  };

  const connectWalletHandler = async (connectorName: E_CONNECTOR_NAMES) => {
    try {
      await connectWallet(connectorName, walletNetwork);
      setConnectorName(connectorName);
      setOpenModalConnectWallet(false);
      setOpenModalConnectSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        id="wallet-connect"
        className="font-merriweather"
        onClick={() => {
          setOpenModalConnectWallet(!openModalConnectWallet);
        }}
      />

      <Modal
        isOpen={openModalConnectWallet}
        titleModal={""}
        toggleOpenModal={toggleOpenModalConnectWallet}
        className="bg-transparent shadow-none "
      >
        <div className="text-left text-[24px] font-black">
          {t("connectWallet")}
        </div>
        <div className="">
          <div className="mb-2 text-left ">{t("chooseNetwork")}</div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className={`btn-connect-wallet border border-secondaryDark text-secondaryDark ${
                walletNetwork === E_NETWORK_ID.BSC_TESTNET ||
                walletNetwork === E_NETWORK_ID.BSC_MAINNET
                  ? chooseTheme(theme, "bg-indigo-200", "bg-grey_organ200")
                  : chooseTheme(theme, "bg-white", "bg-grey_organ300")
              }`}
              onClick={() => {
                setWalletNetwork(
                  process.env.DVSK_NEXT_PUBLIC_DEV
                    ? E_NETWORK_ID.BSC_TESTNET
                    : E_NETWORK_ID.BSC_MAINNET,
                );
              }}
            >
              <span className="self-center capitalize ">{t("binance")}</span>
              <Image
                src={`${getStaticURL()}/assets/images/binance.svg`}
                alt="walletConnect"
                width={44}
                height={44}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="mt-2 text-left">{t("chooseWallet")}</div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className={`btn-connect-wallet flex items-center justify-between border-[#6B0E01] hover:border-secondaryDark  hover:text-secondaryDark `}
              onClick={() => connectWalletHandler(E_CONNECTOR_NAMES.INJECTED)}
            >
              <span className="self-center text-left text-[16px]  capitalize">
                {t("metaMask")}
              </span>
              <Image
                src={`${getStaticURL()}/assets/images/metamask.svg`}
                alt="wallet"
                width={44}
                height={44}
                className="h-[44px] w-[44px]"
              />
            </button>
            <button
              type="button"
              className={`btn-connect-wallet flex items-center justify-between border-[#6B0E01] hover:border-secondaryDark  hover:text-secondaryDark`}
              onClick={() =>
                connectWalletHandler(E_CONNECTOR_NAMES.WALLET_CONNECT)
              }
            >
              <span className="self-center capitalize ">
                {t("walletConnect")}
              </span>
              <Image
                src={`${getStaticURL()}/assets/images/walletconnect.svg`}
                alt="walletConnect"
                width={44}
                height={44}
              />
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModalConnectSuccess}
        titleModal={""}
        toggleOpenModal={() =>
          setOpenModalConnectSuccess(!openModalConnectSuccess)
        }
        className="bg-transparent shadow-none"
      >
        <div>
          <Image
            src={`${getStaticURL()}/assets/images/connect_success_icon.png`}
            alt="walletConnect"
            width={120}
            height={44}
          />
        </div>
        <span className="text-[24px] font-bold text-[#6B0E01]">
          {t("connectSuccess")}
        </span>
      </Modal>
    </>
  );
};
