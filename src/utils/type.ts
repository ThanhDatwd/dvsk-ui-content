export type ChangeEventHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
) => void;

export interface TokenCardProp {
  progressPercent: string;
  amount: string;
}

export type DataSectionProps = {
  label: string;
  value?: string;
  isCopyable?: boolean;
  short?: boolean;
  keyIcon?: JSX.Element;
};

export type MemberCardType = {
  bannerUrl: string;
  avatarUrl: string;
  name: string;
  position: string;
  infoMore: {
    info1: string;
    info2: string;
    info3: string;
  };
};

export type ReferralType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  identifier: string;
  giftboxId: string;
  buyerId: string;
  rewardUserId: string;
  rewardPercentage: number;
  rewardLevel: number;
  status: string;
  payTxHash: string;
  amount: number;
  currency: string;
  paidAmount: number;
  paidCurrency: string;
};

export type LuckySpinType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  userAddress: string;
  refCode: string;
  transferHash: string;
  rewardData: RewardData;
}
type RewardData = {
  type: string;
  amount: string;
  currency: string;
}