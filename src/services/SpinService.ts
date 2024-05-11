import { genHeader } from "@/utils/captcha";
import { AxiosInstance } from "axios";
import restConnector from "../connectors/axiosRestConnector";

export class LuckySpinService {
  private restConnector: AxiosInstance;

  constructor(options: { restConnector: AxiosInstance }) {
    this.restConnector = options.restConnector;
  }

  public getSpinHistory = async (
    userAddress: string | undefined,
    token: string,
  ) => {
    const { data } = await this.restConnector.get(`/lucky-spins/history`, {
      params: {
        userAddress,
      },
      ...genHeader(token),
    });

    return data;
  };

  public spinWheel = async ({
    userAddress,
    signature,
    token,
  }: {
    userAddress: string;
    signature: string;
    token: string;
  }) => {
    const { data } = await this.restConnector.post(
      "/lucky-spins/spin",
      {
        userAddress,
        signature,
      },
      genHeader(token),
    );

    return data;
  };

}

export const luckySpinService = new LuckySpinService({ restConnector });
