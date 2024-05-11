import { DateTime } from "luxon";
import abiUsdtToken from "@/web3/abi/usdt.json";
import { convertNumberToFormattedString } from "./converter";
import { EToken, ITokenOption, TOKENS } from "@/web3/token";

export const getStaticURL = () => process.env.NEXT_PUBLIC_STATIC_URL;

export const vinachainAddress = process.env.NEXT_PUBLIC_VINACHAIN_ADDRESS;

export const exploreVinachainUrl = "";

export const endsInTimer = "December 31, 2023 23:59:59";

export const calculateTimeRemaining = (endsInTimer: string) => {
  const endTime = DateTime.fromISO(endsInTimer);

  const now = DateTime.local();

  const diff = endTime.diff(now, ["days", "hours", "minutes", "seconds"]);

  const timeRemaining = diff.as("seconds");

  const days = diff.toObject().days;
  const hours = diff.toObject().hours;
  const minutes = diff.toObject().minutes;
  const seconds = diff.toObject().seconds?.toFixed(0);

  return { timeRemaining, days, hours, minutes, seconds };
};

export enum NETWORK {
  ETHEREUM = "ethereum",
  BINANCE = "binance",
}

export enum Currencies {
  USC = "USC",
  USDT = "USDT",
}

export enum FilterUserHistory {
  // ALL = "all",
  DEPOSIT = "deposit",
  // WITHDRAW = "withdraw",
}
export const DEFAULT_AUTOCLOSE_TOAST = 2000;

export enum PathName {
  DASHBOARD = "/",
  USERS = "/users",
  GAMES = "/games",
  PORTAL_TRANSACTION = "/portal-transaction",
  GAME_TRANSACTION = "/game-transaction",
  FEEDBACK = "/feedback",
  REFERRAL = "/referral",
}
export const subLinkReferral = [
  {
    label: "referral",
    link: "/referral",
  },
  {
    label: "referralType",
    link: "/referral/referral-type",
  },
  {
    label: "referralReward",
    link: "/referral/referral-reward",
  },
];

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_GAME_PAGE_SIZE = 18;
export const DEFAULT_PAGE_NUMBER = 0;

export const MINIMUM_TX_CONFIRMATION = 5;
export const REFECT_CONFIRMATION_BLOCK = 3000;

export const PAGINATION_OPTIONS = [
  {
    label: "10",
    value: "10",
  },
  {
    label: "20",
    value: "20",
  },
  {
    label: "30",
    value: "30",
  },
  {
    label: "50",
    value: "50",
  },
];

export enum FilterOfDirection {
  ALL = "all",
  IN = "in",
  OUT = "out",
}

export enum Direction {
  IN = "in",
  OUT = "out",
}

export enum Network {
  ETHEREUM = "ethereum",
  BINANCE = "binance",
}

export enum Currency {
  USC_ETH = "usc_eth",
  USC_BSC = "usc_bsc",
}

export enum ActionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export enum TransferStatus {
  PENDING_TRANSFER = "pending_transfer",
  TRANSFERED = "transfered",
}

export const enum Event {
  TRANSACTIONS = "transactions",
  VERIFY = "verify",
}

export const enum VerifyStatus {
  NOT_VERIFY = "not_verify",
  VERIFY_SUCCESS = "verify_success",
  VERIFY_FAIL = "verify_fail",
}

export const DEFAULT_LOAD_CARD_AMOUNT = 0;

export const DEFAULT_STRING_SHOW = 20;

export const DefaultPaginationQuery = {
  sort: "-createdAt",
  limit: DEFAULT_PAGE_SIZE.toString(),
  offset: DEFAULT_PAGE_NUMBER.toString(),
};

export const BLOCKCHAIN_CHAIN: any = {
  1: "eth",
  5: "eth",
  56: "bsc",
  97: "bsc",
};

export enum TRANSACTION_DOMAIN {
  PORTAL = "portal",
  INTEGRATION = "integration",
  PARTNER = "partner",
}

export const OptionsAction = [
  {
    label: "all",
    value: "",
  },
  {
    label: "deposit",
    value: "deposit",
  },
  {
    label: "withdraw",
    value: "withdraw",
  },
  {
    label: "referral",
    value: "referral",
  },
  {
    label: "gameDeposit",
    value: "topup_to_integration",
  },
  {
    label: "gameWithdraw",
    value: "cashout_from_integration",
  },
  {
    label: "fee",
    value: "fee",
  },
  {
    label: "fundTransfer",
    value: "fund_transfer",
  },
  {
    label: "betPlaced",
    value: "bet_placed",
  },
  {
    label: "betSettled",
    value: "bet_settled",
  },
  {
    label: "betRollback",
    value: "bet_rollback",
  },
];

export const OptionsDirection = [
  {
    label: "all",
    value: "all",
  },
  {
    label: "in",
    value: "in",
  },
  {
    label: "out",
    value: "out",
  },
];

export const OptionsSearchUserBy = [
  { label: "Username", value: "username" },
  { label: "Full name", value: "fullname" },
];
export const OptionsSearchPostBy = [{ label: "Tag", value: "tag" }];
export const OptionsFeedbackSearchBy = [
  { label: "Feedback Title", value: "title" },
  { label: "Email", value: "email" },
  { label: "Phone Number", value: "phoneNumber" },
];

export const OptionsSearchByForReferral = [
  { label: "code", value: "code" },
  { label: "ownerEmail", value: "ownerEmail" },
];

export const OptionsSearchByForReferralType = [
  { label: "refCode", value: "refCode" },
  { label: "ownerEmail", value: "ownerEmail" },
];

export const OptionsSearchByForReferralReward = [
  { label: "referralName", value: "name" },
];

export const OptionsStatus = [
  {
    label: "Submitted",
    value: "submitted",
  },
  {
    label: "Solved",
    value: "solved",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

export const OptionsLanguage = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "简体中文",
    value: "cn",
  },
  {
    label: "VietNam",
    value: "vi",
  },
];

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

export const DEFAULT_DATE_RANGE = 1;

export const MAX_INTEGRATION_NAME_LENGTH = 20;

export const FIXED_VALUE = 5;
export const MAX_FEEDBACK_IMAGE = 5;

export const ALI_CLOUD_ACCESS_CREDENTIAL = "ali_oss_credentials";
export const ALI_CREDENTIALS_TIMEOUT_IN_MILI_SECONDS = 900000; //15 minutes
export const debounce = (fn: Function, delay: number) => {
  let timer: any;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const VinachainData = [
  {
    page: "vinaChain",
    footerItemKey: "useVina",
    footerItemValue: "title",
    footerList: [
      {
        label: "findWallet",
        link: "/coming-soon",
      },
      {
        label: "getUSDv",
        link: "/coming-soon",
      },
      {
        label: "dapps",
        link: "/coming-soon",
      },
      {
        label: "layer2",
        link: "/coming-soon",
      },
      {
        label: "runANode",
        link: "/coming-soon",
      },
      {
        label: "stableCoins",
        link: "/coming-soon",
      },
      {
        label: "skate",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaChain",
    footerItemKey: "learn",
    footerItemValue: "title",
    footerList: [
      {
        label: "learnHub",
        link: "/coming-soon",
      },
      {
        label: "whatIsUSDv",
        link: "/coming-soon",
      },
      {
        label: "uSDvWallets",
        link: "/coming-soon",
      },
      {
        label: "layer2",
        link: "/coming-soon",
      },
      {
        label: "gasFees",
        link: "/coming-soon",
      },
      {
        label: "uSDvSecurityAndScamPrevention",
        link: "/coming-soon",
      },
      {
        label: "whatIsWeb3",
        link: "/coming-soon",
      },
      {
        label: "smartConstracts",
        link: "/coming-soon",
      },
      {
        label: "uSDvEnergyConsumption",
        link: "/coming-soon",
      },
      {
        label: "uSDvRoadmap",
        link: "/coming-soon",
      },
      {
        label: "uSDvImprovementProposals",
        link: "/coming-soon",
      },
      {
        label: "historyOfUSDv",
        link: "/coming-soon",
      },
      {
        label: "uSDvWallpaper",
        link: "/coming-soon",
      },
      {
        label: "uSDvGlossary",
        link: "/coming-soon",
      },
      {
        label: "uSDvGovernance",
        link: "/coming-soon",
      },
      {
        label: "blockchainBridges",
        link: "/coming-soon",
      },
      {
        label: "zeroKnowledgeProofs",
        link: "/coming-soon",
      },
      {
        label: "quizHub",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaChain",
    footerItemKey: "developers",
    footerItemValue: "title",
    footerList: [
      {
        label: "getStarted",
        link: "/coming-soon",
      },
      {
        label: "documentation",
        link: "/coming-soon",
      },
      {
        label: "tutorials",
        link: "/coming-soon",
      },
      {
        label: "learnByConding",
        link: "/coming-soon",
      },
      {
        label: "setUpLocalEnviroment",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaChain",
    footerItemKey: "ecosystem",
    footerItemValue: "title",
    footerList: [
      {
        label: "communityHub",
        link: "/coming-soon",
      },
      {
        label: "uSDvFoundation",
        link: "/coming-soon",
      },
      {
        label: "uSDvFoundationBlog",
        link: "/coming-soon",
      },
      {
        label: "uSDvBugBountyProgram",
        link: "/coming-soon",
      },
      {
        label: "ecosystemGrantProgram",
        link: "/coming-soon",
      },
      {
        label: "uSDvBrandAssets",
        link: "/coming-soon",
      },
      {
        label: "devCon",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaChain",
    footerItemKey: "enterprise",
    footerItemValue: "title",
    footerList: [
      {
        label: "mainnetUSDv",
        link: "/coming-soon",
      },
      {
        label: "privateUSDv",
        link: "/coming-soon",
      },
      {
        label: "enterprise",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaChain",
    footerItemKey: "about",
    footerItemValue: "title",
    footerList: [
      {
        label: "aboutUs",
        link: "/coming-soon",
      },
      {
        label: "jobs",
        link: "/coming-soon",
      },
      {
        label: "contributing",
        link: "/coming-soon",
      },
      {
        label: "languageSupport",
        link: "/coming-soon",
      },
      {
        label: "privacyPolicy",
        link: "/coming-soon",
      },
      {
        label: "termOfUse",
        link: "/coming-soon",
      },
      {
        label: "cookiePolicy",
        link: "/coming-soon",
      },
      {
        label: "contact",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaChain",
    footerItemKey: "community",
    footerItemValue: "title",
    footerList: [
      {
        label: "communityHub",
        link: "/coming-soon",
      },
      {
        label: "onlineCommunities",
        link: "/coming-soon",
      },
      {
        label: "uSDTevents",
        link: "/coming-soon",
      },
      {
        label: "getInvolved",
        link: "/coming-soon",
      },
      {
        label: "openResearch",
        link: "/coming-soon",
      },
      {
        label: "grants",
        link: "/coming-soon",
      },
      {
        label: "uSDTSupport",
        link: "/coming-soon",
      },
      {
        label: "languageResources",
        link: "/coming-soon",
      },
    ],
  },
];

export const VinachainHeader = VinachainData.filter(
  (item, index) => item.footerItemKey !== "about",
);
export const VinachainFooter = VinachainData.filter(
  (item, index) => item.footerItemKey !== "community",
);

export const VinaScanData = [
  {
    page: "vinaScan",
    footerItemKey: "blockchain",
    footerItemValue: "title",
    footerList: [
      {
        label: "transactions",
        link: "/coming-soon",
      },
      {
        label: "pendingTransactions",
        link: "/coming-soon",
      },
      {
        label: "contractInternalTransactions",
        link: "/coming-soon",
      },
      {
        label: "beaconDeposits",
        link: "/coming-soon",
      },
      {
        label: "beaconWithdrawals",
        link: "/coming-soon",
      },
      {
        label: "stablecoins",
        link: "/coming-soon",
      },
      {
        label: "skateVNC",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaScan",
    footerItemKey: "tokens",
    footerItemValue: "title",
    footerList: [
      {
        label: "topTokens",
        link: "/coming-soon",
      },
      {
        label: "tokensTransfer",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaScan",
    footerItemKey: "nFTs",
    footerItemValue: "title",
    footerList: [
      {
        label: "topNFTs",
        link: "/coming-soon",
      },
      {
        label: "topMints",
        link: "/coming-soon",
      },
      {
        label: "lastedTrades",
        link: "/coming-soon",
      },
      {
        label: "lastedTransfer",
        link: "/coming-soon",
      },
      {
        label: "lastedMints",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaScan",
    footerItemKey: "resources",
    footerItemValue: "title",
    footerList: [
      {
        label: "chartsAndStats",
        link: "/coming-soon",
      },
      {
        label: "topStatistics",
        link: "/coming-soon",
      },
      {
        label: "leaderboard",
        link: "/coming-soon",
      },
      {
        label: "directory",
        link: "/coming-soon",
      },
      {
        label: "newsletter",
        link: "/coming-soon",
      },
      {
        label: "knowledgeBase",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "vinaScan",
    footerItemKey: "developers",
    footerItemValue: "title",
    footerList: [
      {
        label: "aPIPlans",
        link: "/coming-soon",
      },
      {
        label: "aPIDocumentation",
        link: "/coming-soon",
      },
      {
        label: "codeReader",
        link: "/coming-soon",
      },
      {
        label: "verifyContract",
        link: "/coming-soon",
      },
      {
        label: "similarContractSearch",
        link: "/coming-soon",
      },
      {
        label: "smartContractSearch",
        link: "/coming-soon",
      },
      {
        label: "contractDiffChecker",
        link: "/coming-soon",
      },
      {
        label: "vyperOnlineCompiler",
        link: "/coming-soon",
      },
      {
        label: "bytecodeToOpcode",
        link: "/coming-soon",
      },
      {
        label: "broadcastTransaction",
        link: "/coming-soon",
      },
    ],
  },
];
export const VinaScanHeader = [...VinaScanData];
export const VinaScanFooter = VinaScanData.filter(
  (item, index) => item.footerItemKey !== "more",
);

export const Developers = [
  {
    label: "getStarted",
    link: "/coming-soon",
  },
  {
    label: "documentation",
    link: "/coming-soon",
  },
  {
    label: "tutorials",
    link: "/coming-soon",
  },
  {
    label: "learnByConding",
    link: "/coming-soon",
  },
  {
    label: "setUpLocalEnviroment",
    link: "/coming-soon",
  },
];

export const Ecosystem = [
  {
    label: "communityHub",
    link: "/coming-soon",
  },
  {
    label: "uSDvFoundation",
    link: "/coming-soon",
  },
  {
    label: "uSDvFoundationBlog",
    link: "/coming-soon",
  },
  {
    label: "uSDvBugBountyProgram",
    link: "/coming-soon",
  },
  {
    label: "ecosystemGrantProgram",
    link: "/coming-soon",
  },
  {
    label: "uSDvBrandAssets",
    link: "/coming-soon",
  },
  {
    label: "devCon",
    link: "/coming-soon",
  },
];

export const Enterprise = [
  {
    label: "mainnetUSDv",
    link: "/coming-soon",
  },
  {
    label: "privateUSDv",
    link: "/coming-soon",
  },
  {
    label: "enterprise",
    link: "/coming-soon",
  },
];

export const About = [
  {
    label: "aboutUs",
    link: "/coming-soon",
  },
  {
    label: "jobs",
    link: "/coming-soon",
  },
  {
    label: "contributing",
    link: "/coming-soon",
  },
  {
    label: "languageSupport",
    link: "/coming-soon",
  },
  {
    label: "privacyPolicy",
    link: "/coming-soon",
  },
  {
    label: "termOfUse",
    link: "/coming-soon",
  },
  {
    label: "cookiePolicy",
    link: "/coming-soon",
  },
  {
    label: "contact",
    link: "/coming-soon",
  },
];

export const Community = [
  {
    label: "communityHub",
    link: "/coming-soon",
  },
  {
    label: "onlineCommunities",
    link: "/coming-soon",
  },
  {
    label: "uSDTevents",
    link: "/coming-soon",
  },
  {
    label: "getInvolved",
    link: "/coming-soon",
  },
  {
    label: "openResearch",
    link: "/coming-soon",
  },
  {
    label: "grants",
    link: "/coming-soon",
  },
  {
    label: "uSDTSupport",
    link: "/coming-soon",
  },
  {
    label: "languageResources",
    link: "/coming-soon",
  },
];
export const ADDRESS_NULL = "0x0000000000000000000000000000000000000000";

export const HardCap = 2000000;
export const SoftCap = 1000000;
export const StartDate = "18/12/2023";
export const EndDate = "18/12/2023";
export const DateRange = 90;
export const Rate = 0.00018;
export const ListRate = 0.0018;
export const Unlock = "100%";
export const TotalSupply = "N/A";
export const InitialSupply = convertNumberToFormattedString(
  String(Rate * HardCap),
);

export const PoolDetailsSectionData = [
  {
    label: "hardCap",
    value: convertNumberToFormattedString(String(HardCap)),
  },
  {
    label: "softCap",
    value: convertNumberToFormattedString(String(SoftCap)),
  },
  {
    label: "startDay",
    value: DateTime.fromFormat(StartDate, "dd/MM/yyyy").toFormat(
      "LLL dd, yyyy",
    ),
  },
  {
    label: "endDay",
    value: DateTime.fromFormat(StartDate, "dd/MM/yyyy")
      .plus({ days: DateRange })
      .toFormat("LLL dd, yyyy"),
  },
  {
    label: "rate",
    value: `1 VNDT = $${Rate}`,
  },
  {
    label: "listRate",
    value: `1 VNDT = $${ListRate}`,
  },
  {
    label: "unlock",
    value: Unlock,
  },
];

export const TokenSectionData = [
  {
    label: "token",
    value: "Vina Token",
  },
  {
    label: "ticker",
    value: "$USDT",
  },
  {
    label: "totalSupply",
    value: TotalSupply,
  },
  {
    label: "initialSupply",
    value: InitialSupply,
  },
  {
    label: "tokenForSale",
    value: "",
  },
  {
    label: "listing",
    value: "",
  },
  {
    label: "address",
    value: vinachainAddress,
    isCopyable: true,
    short: true,
  },
];

export const TokenOptions: ITokenOption[] = [
  {
    name: TOKENS.USDT.name,
    value: EToken.USDT,
    image: `${getStaticURL()}/assets/images/liquidity/${TOKENS.USDT.image}`,
    abi: abiUsdtToken,
    address: "",
  },
];

export const optionFilterScan = [
  {
    label: "All filter",
    value: "all",
  },
  {
    label: "Address",
    value: "address",
  },
  {
    label: "Tokens",
    value: "tokens",
  },
  {
    label: "Name tags",
    value: "name-tags",
  },
  {
    label: "Labels",
    value: "labels",
  },
  {
    label: "Websites",
    value: "websites",
  },
];
