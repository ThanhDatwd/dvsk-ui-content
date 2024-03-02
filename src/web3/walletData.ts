import { ENetwork, EConnectorNames, ITWallet } from "./token";

export const walletsConfig: ITWallet[] = [
  {
    id: "0",
    label: "WalletConnect",
    icon: "/static/images/wallets/wallet-connect.svg",
    iconDisable: "/static/images/wallets/wallet-connect-disabled.svg",
    network: [ENetwork.ethereum, ENetwork.binance, ENetwork.polygon],
    disabled: false,
    connectorName: EConnectorNames.walletConnect,
  },
  {
    id: "1",
    label: "Metamask",
    icon: "/static/images/wallets/metamask.svg",
    iconDisable: "/static/images/wallets/metamask-disabled.svg",
    network: [ENetwork.ethereum, ENetwork.binance, ENetwork.polygon],
    disabled: false,
    connectorName: EConnectorNames.injected,
  },
];

export const connectorLocalStorageKey = "connectorId";
