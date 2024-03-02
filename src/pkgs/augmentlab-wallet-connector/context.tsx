"use client";

import { createContext, useContext, useState } from "react";
import { E_CONNECTOR_NAMES, E_NETWORK_ID } from "./types";
import { Currencies, NETWORK } from "@/utils/constants";
import { SAVE_CURRENT_NETWORK_KEY } from "./connector";

export interface IAugmentlabsWalletContext {
  connectorName: E_CONNECTOR_NAMES;
  setConnectorName: (connectorName: E_CONNECTOR_NAMES) => void;
  currentCurrency: Currencies;
  setCurentCurency: (currentCurrency: Currencies) => void;
  network: NETWORK;
  setNetwork: (network: NETWORK) => void;
  walletNetwork: E_NETWORK_ID;
  setWalletNetwork: (walletNetwork: E_NETWORK_ID) => void;
}

const defaultContext: IAugmentlabsWalletContext = {
  connectorName: E_CONNECTOR_NAMES.UNKNOWN,
  setConnectorName: () => {},
  currentCurrency: Currencies.USC,
  setCurentCurency: () => {},
  network: NETWORK.BINANCE,
  setNetwork: () => {},
  walletNetwork: E_NETWORK_ID.BSC_TESTNET,
  setWalletNetwork: () => {},
};

const AugmentlabsWalletContext = createContext(defaultContext);
export const AugmentlabsWalletProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connectorName, setConnectorName] = useState<E_CONNECTOR_NAMES>(
    E_CONNECTOR_NAMES.UNKNOWN,
  );
  const [currentCurrency, setCurentCurency] = useState<Currencies>(
    Currencies.USDT,
  );
  const [network, setNetwork] = useState<NETWORK>(NETWORK.BINANCE);
  const [walletNetwork, setWalletNetwork] = useState<E_NETWORK_ID>(
    (() => {
      if (typeof window !== "undefined") {
        // const data = localStorage.getItem(SAVE_CURRENT_NETWORK_KEY);
        // if (data) {
        //   const currentChainId = parseInt(data) as unknown as E_NETWORK_ID;
        //   return currentChainId;
        // }
      }

      return process.env.NEXT_PUBLIC_DEV
        ? E_NETWORK_ID.BSC_TESTNET
        : E_NETWORK_ID.BSC_MAINNET;
    })(),
  );

  return (
    <AugmentlabsWalletContext.Provider
      value={{
        connectorName,
        setConnectorName,
        currentCurrency,
        setCurentCurency,
        network,
        setNetwork,
        walletNetwork,
        setWalletNetwork,
      }}
    >
      {children}
    </AugmentlabsWalletContext.Provider>
  );
};

export const useAugmentlabsWalletContext = () => {
  return useContext(AugmentlabsWalletContext);
};
