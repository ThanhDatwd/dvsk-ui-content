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
