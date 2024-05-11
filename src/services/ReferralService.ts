import { genHeader } from "@/utils/captcha";
import { AxiosInstance } from "axios";
import restConnector from "../connectors/axiosRestConnector";

export class ReferralService {
  private restConnector: AxiosInstance;

  constructor(options: { restConnector: AxiosInstance }) {
    this.restConnector = options.restConnector;
  }

  public getReferralHistory = async (
    userAddress: string | undefined,
    token: string,
  ) => {
    const { data } = await this.restConnector.get(`/user-referrals/history`, {
      params: {
        userAddress,
      },
      ...genHeader(token),
    });

    return data;
  };

  public viewMyReferralReward = async (userAddress: string, token: string) => {
    const { data } = await this.restConnector.get("/user-referrals/rewards", {
      params: {
        userAddress,
      },
      ...genHeader(token),
    });

    return data;
  };

  public claimReferralReward = async (
    userAddress: string,
    signature: string,
    token: string,
  ) => {
    const { data } = await this.restConnector.post(
      "/user-referrals/rewards/claim",
      {
        userAddress,
        signature,
      },
      genHeader(token),
    );

    return data;
  };
}

export const referralService = new ReferralService({ restConnector });
