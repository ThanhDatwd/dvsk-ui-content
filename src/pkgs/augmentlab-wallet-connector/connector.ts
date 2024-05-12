import { Web3ReactHooks, initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";
import { E_CONNECTOR_NAMES, E_NETWORK_ID } from "./types";
import { MetaMask } from "@web3-react/metamask";
import { EMPTY, Empty } from "@web3-react/empty";
import Web3 from "web3";
export const SAVE_CURRENT_NETWORK_KEY = "currentNetwork";

const projectId = process.env.DVSK_NEXT_PUBLIC_WAllETCONNECT_PROJECT_ID as string;

export const [walletConnectV2EthTestNet, walletHooksEthTestNet] =
  initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: projectId,
          showQrModal: true,
          chains: [E_NETWORK_ID.ETH_TESTNET],
          optionalChains: [E_NETWORK_ID.ETH_TESTNET],
        },
      }),
  );
export const [walletConnectV2EthMainNet, walletHooksEthMainNet] =
  initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: projectId,
          showQrModal: true,
          chains: [E_NETWORK_ID.ETH_MAINNET],
          optionalChains: [E_NETWORK_ID.ETH_MAINNET],
        },
      }),
  );
export const [walletConnectV2BscTestNet, walletHooksBscTestNet] =
  initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: projectId,
          showQrModal: true,
          chains: [E_NETWORK_ID.BSC_TESTNET],
          optionalChains: [E_NETWORK_ID.BSC_TESTNET],
        },
      }),
  );
export const [walletConnectV2BscMainNet, walletHooksBscMainNet] =
  initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: projectId,
          showQrModal: true,
          chains: [E_NETWORK_ID.BSC_MAINNET],
          optionalChains: [E_NETWORK_ID.BSC_MAINNET],
        },
      }),
  );

export const [injected, injectedHooks] = initializeConnector<MetaMask>(
  (actions) =>
    new MetaMask({
      actions,
    }),
);

export const [empty, hooks] = initializeConnector<Empty>(() => EMPTY);

export const getConnectorByName = (
  connectorName: E_CONNECTOR_NAMES,
  chainId: E_NETWORK_ID,
): {
  connector: WalletConnectV2 | MetaMask | Empty;
  hook: Web3ReactHooks;
} => {
  switch (connectorName) {
    case E_CONNECTOR_NAMES.WALLET_CONNECT:
      if (chainId === E_NETWORK_ID.BSC_TESTNET) {
        return {
          connector: walletConnectV2BscTestNet,
          hook: walletHooksBscTestNet,
        };
      } else if (chainId === E_NETWORK_ID.BSC_MAINNET) {
        return {
          connector: walletConnectV2BscMainNet,
          hook: walletHooksBscMainNet,
        };
      } else if (chainId === E_NETWORK_ID.ETH_MAINNET) {
        return {
          connector: walletConnectV2EthMainNet,
          hook: walletHooksEthMainNet,
        };
      } else {
        return {
          connector: walletConnectV2EthTestNet,
          hook: walletHooksEthTestNet,
        };
      }
    case E_CONNECTOR_NAMES.INJECTED:
      return {
        connector: injected,
        hook: injectedHooks,
      };
    case E_CONNECTOR_NAMES.UNKNOWN:
      return {
        connector: empty,
        hook: hooks,
      };
  }
  return {
    connector: empty,
    hook: hooks,
  };
};

export const useConnectorByName = (
  connectorName: E_CONNECTOR_NAMES,
): {
  connector: WalletConnectV2 | MetaMask | Empty;
  hook: Web3ReactHooks;
} => {
  let currentChainId = E_NETWORK_ID.ETH_TESTNET;
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(SAVE_CURRENT_NETWORK_KEY);
    currentChainId = data ? parseInt(data) : E_NETWORK_ID.ETH_TESTNET;
  }
  if (!currentChainId) {
    currentChainId = E_NETWORK_ID.ETH_TESTNET;
  }
  return getConnectorByName(connectorName, currentChainId);
};

export const getContract = (provider: any, abi: any, address: string) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(abi, address);
};

export const getGasPriceAndGasLimit = async (provider: any) => {
  const web3 = new Web3(provider as any);
  const gasPrice = await web3.eth.getGasPrice();
  return {
    gasPrice,
    gasLimit: 300000,
  };
};

export const connectWallet = async (
  connectorName: E_CONNECTOR_NAMES,
  chainId: E_NETWORK_ID,
) => {
  localStorage.setItem(SAVE_CURRENT_NETWORK_KEY, chainId.toString());
  const { connector } = getConnectorByName(connectorName, chainId);
  disconnectWallet(connectorName, true);
  await connector.activate(chainId);
};

export const getCurrentChainId = () => {
  if (typeof window === "undefined") return E_NETWORK_ID.ETH_TESTNET;
  let currentChainId: string | null | E_NETWORK_ID = localStorage.getItem(
    SAVE_CURRENT_NETWORK_KEY,
  );
  if (!currentChainId) {
    currentChainId = E_NETWORK_ID.ETH_TESTNET;
  }
  return parseInt(currentChainId.toString()) as E_NETWORK_ID;
};

export const disconnectWallet = async (
  connectorName: E_CONNECTOR_NAMES,
  ignoreReload = false,
) => {
  let currentChainId: string | null | E_NETWORK_ID = localStorage.getItem(
    SAVE_CURRENT_NETWORK_KEY,
  );
  if (!currentChainId) {
    currentChainId = E_NETWORK_ID.ETH_TESTNET;
  }
  currentChainId = parseInt(currentChainId.toString()) as E_NETWORK_ID;
  const { connector } = getConnectorByName(connectorName, currentChainId);
  connector.resetState();

  // clear all local storage with key start with wl
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("wc")) {
      localStorage.removeItem(key);
    }
  });
  if (connectorName === E_CONNECTOR_NAMES.WALLET_CONNECT && !ignoreReload) {
    window.location.reload();
  }
};

export const isChainSupported = (chainId: number | undefined) => {
  return (
    chainId === E_NETWORK_ID.BSC_MAINNET ||
    chainId === E_NETWORK_ID.BSC_TESTNET ||
    chainId === E_NETWORK_ID.ETH_MAINNET ||
    chainId === E_NETWORK_ID.ETH_TESTNET
  );
};

export const connectors: [WalletConnectV2 | MetaMask, Web3ReactHooks][] = [
  [walletConnectV2EthTestNet, walletHooksEthTestNet],
  [walletConnectV2BscTestNet, walletHooksBscTestNet],
  [injected, injectedHooks],
];
