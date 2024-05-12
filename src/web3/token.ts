import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";

export interface IToken {
  name: string;
  image: string;
  address: string;
  value: EToken;
}

export enum EToken {
  USC = "USC",
  USDT = "USDT",
  VPL = "VPL",
}

export type ITokenMap = { [key in EToken]: IToken };

export const TOKENS: ITokenMap = {
  USC: {
    name: "USC",
    value: EToken.USC,
    image: "usc.png",
    address: "",
  },
  USDT: {
    name: "USDT",
    value: EToken.USDT,
    image: "usdt.svg",
    address: "",
  },
  VPL: {
    name: "VPL",
    value: EToken.VPL,
    image: "vpl.png",
    address: "",
  },
};

export const CONTRACT_ADDRESS = {
  [EToken.USC]: {
    [E_NETWORK_ID.ETH_MAINNET]: "0x0B37377071aF24921114dccf5eb8EA6E746D0410", // ethereumMainNetId
    [E_NETWORK_ID.ETH_TESTNET]: "0x1Af0D914920B2A1Ab057faDE71043E1B8B0BCbb4", // ethereumTestNetId
    [E_NETWORK_ID.BSC_MAINNET]: "0x151F5d74823Bd2DBD7e574706474a291Db8CAF95", // binanceMainNetId
    [E_NETWORK_ID.BSC_TESTNET]: "0xd34BccbB0AE0866d16EAc857a6e5dF9dBD9f97ce", // binanceTestNetId
  },
  [EToken.USDT]: {
    [E_NETWORK_ID.ETH_MAINNET]: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // ethereumMainNetId
    [E_NETWORK_ID.ETH_TESTNET]: "0x1f1ef35EFe2BD0AD76600791bC652EC56d96f9ea", // ethereumTestNetId
    [E_NETWORK_ID.BSC_MAINNET]: "0x55d398326f99059ff775485246999027b3197955", // binanceMainNetId
    [E_NETWORK_ID.BSC_TESTNET]: "0x70Ac99C98d0123111a4A4A32d44A9a03667Caed1", // binanceTestNetId
  },
  [EToken.VPL]: {
    [E_NETWORK_ID.ETH_MAINNET]: "0xd34BccbB0AE0866d16EAc857a6e5dF9dBD9f97ce", // ethereumMainNetId
    [E_NETWORK_ID.ETH_TESTNET]: "0xd34BccbB0AE0866d16EAc857a6e5dF9dBD9f97ce", // ethereumTestNetId
    [E_NETWORK_ID.BSC_MAINNET]: "0x31dD51eB09A21ad6d95035D0164827acF362E308", // binanceMainNetId
    [E_NETWORK_ID.BSC_TESTNET]: "0xd34BccbB0AE0866d16EAc857a6e5dF9dBD9f97ce", // binanceTestNetId
  },
  DVSK: {
    0: "",
    [E_NETWORK_ID.ETH_MAINNET]: process.env.DVSK_NEXT_PUBLIC_DVSK_ADDRESS, // ethereumMainNetId
    [E_NETWORK_ID.ETH_TESTNET]: process.env.DVSK_NEXT_PUBLIC_DVSK_ADDRESS, // ethereumTestNetId
    [E_NETWORK_ID.BSC_MAINNET]: process.env.DVSK_NEXT_PUBLIC_DVSK_ADDRESS, // binanceMainNetId
    [E_NETWORK_ID.BSC_TESTNET]: process.env.DVSK_NEXT_PUBLIC_DVSK_ADDRESS, // binanceTestNetId
  },
  NFT: {
    0: "",
    [E_NETWORK_ID.ETH_MAINNET]: process.env.DVSK_NEXT_PUBLIC_NFT_ADDRESS, // ethereumMainNetId
    [E_NETWORK_ID.ETH_TESTNET]: process.env.DVSK_NEXT_PUBLIC_NFT_ADDRESS, // ethereumTestNetId
    [E_NETWORK_ID.BSC_MAINNET]: process.env.DVSK_NEXT_PUBLIC_NFT_ADDRESS, // binanceMainNetId
    [E_NETWORK_ID.BSC_TESTNET]: process.env.DVSK_NEXT_PUBLIC_NFT_ADDRESS, // binanceTestNetId
  },
};

export enum EConnectorNames {
  injected = "injected",
  walletConnect = "walletconnect",
  bsc = "bsc",
}

export enum ENetworkId {
  ethereumMainNetId = 1,
  ethereumTestNetId = 5,
  binanceMainNetId = 56,
  binanceTestNetId = 97,
  unknown = 0,
}

export enum ENetwork {
  ethereum = "ethereum",
  binance = "binance",
  polygon = "polygon",
}

export type ITWallet = {
  id: string;
  label: string;
  icon: string;
  iconDisable: string;
  network: ENetwork[];
  disabled: boolean;
  connectorName: EConnectorNames;
};

export const LOCAL_STORAGE_ACCOUNT_KEY = "account";

export interface IStorageAccount {
  accountId: string;
  eNetwordId: number;
}

export interface IPairReserves {
  "0": string;
  "1": string;
  "2": string;
  reserve0: string;
  reserve1: string;
  blockTimestampLast: string;
}

// abi interface
export type IAbis = IAbi[];

export interface IAbi {
  inputs: IAbiInput[];
  stateMutability?: string;
  type: string;
  anonymous?: boolean;
  name?: string;
  outputs?: IAbiOutput[];
}

export interface IAbiInput {
  indexed?: boolean;
  internalType: string;
  name: string;
  type: string;
}

export interface IAbiOutput {
  internalType: string;
  name: string;
  type: string;
}

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export interface ITokenOption {
  name: string;
  value: EToken;
  image: string;
  abi: IAbis;
  address: string;
}

export const FIXED_VALUE = 5;

export const RPCS = {
  1: "https://mainnet.infura.io/v3/",
  5: "https://rpc.ankr.com/eth_goerli",
  56: "https://bsc-dataseed.binance.org",
  97: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
};

export const SCANS = {
  1: "https://etherscan.io/",
  5: "https://goerli.etherscan.io/",
  56: "https://bscscan.com/",
  97: "https://testnet.bscscan.com/",
};
