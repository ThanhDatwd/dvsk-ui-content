import { AxiosInstance } from "axios";
import restConnector from "../connectors/axiosRestConnector";
import { genHeader } from "@/utils/captcha";

const AUTHORIZATION_HEADER = "Authorization";
export const ACCESS_TOKEN_COOKIE = "jwt";

export class GiftboxService {
  private jwt: string | null;
  private restConnector: AxiosInstance;

  constructor(options: { restConnector: AxiosInstance }) {
    this.jwt = null;
    this.restConnector = options.restConnector;
  }

  public getGiftBoxStatus = async (
    userAddress: string | undefined,
    token: string,
  ) => {
    const { data } = await this.restConnector.get("/giftboxes/status", {
      params: {
        userAddress,
      },
      ...genHeader(token),
    });

    return data;
  };
  public lockGift = async ({
    userAddress,
    sleepTime,
    boxNumber,
    signature,
    token,
  }: {
    userAddress: string;
    sleepTime?: number;
    boxNumber: number;
    signature: string;
    token: string;
  }) => {
    const { data } = await this.restConnector.post(
      "/giftboxes/lock",
      {
        userAddress,
        sleepTime,
        boxNumber,
        signature,
        token,
      },
      genHeader(token),
    );

    return data;
  };

  public buyGift = async ({
    userAddress,
    sleepTime,
    boxNumber,
    signature,
    amount,
    currency,
    token,
    txHash,
  }: {
    userAddress: string;
    sleepTime?: number;
    boxNumber: number;
    signature: string;
    amount: string;
    currency: string;
    token: string;
    txHash: string;
  }) => {
    const { data } = await this.restConnector.post(
      "/giftboxes/buy",
      {
        userAddress,
        sleepTime,
        boxNumber,
        signature,
        amount,
        currency,
        txHash,
      },
      genHeader(token),
    );

    return data;
  };

  public viewMyReferral = async (token: string, userId: string) => {
    const { data } = await this.restConnector.get("/user-referrals/view", {
      params: {
        userId,
      },
      ...genHeader(token),
    });

    return data;
  };

  public applyReferralCode = async (
    token: string,
    userId: string,
    referrerCode: string,
  ) => {
    const { data } = await this.restConnector.post(
      "/user-referrals",
      {
        userId,
        referrerCode,
      },
      genHeader(token),
    );
    return data;
  };

  public receiveReferralReward = async (token: string, userId: string) => {
    const { data } = await this.restConnector.post(
      "/user-referrals/receive-reward",
      {
        userId,
      },
      genHeader(token),
    );
    return data;
  };
}

export const giftboxService = new GiftboxService({ restConnector });
