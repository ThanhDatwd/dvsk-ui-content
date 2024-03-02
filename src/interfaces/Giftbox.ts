export interface Giftbox {
  isUserLocked: boolean;
  giftboxStatuses: GiftboxStatuses;
  userGiftbox: UserGiftbox;
}
interface UserGiftbox {
  locked: Gift;
  completed: Gift[];
}
export interface Gift {
  createdAt: string;
  updatedAt: string;
  id: number;
  status: GiftStatus;
  code: string;
  txHash?: any;
  userAddress: string;
  signature?: any;
  giftboxData: GiftboxData;
  lockedAt: string;
}
export interface GiftboxData {
  rarity: string;
  tokenId: number;
  metadata: Metadata;
  tokenAddress: string;
}
interface Metadata {
  name: string;
  description: string;
  image: string;
}
interface GiftboxStatuses {
  available: number[];
  completed: number[];
  locked: number[];
}

enum GiftStatus {
  AVAILABLE = "AVAILABLE",
  LOCKED = "LOCKED",
  COMPLETED = "COMPLETED",
}
