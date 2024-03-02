import axios from "axios";

export const ACCESS_TOKEN_COOKIE = "jwt";

const ADDRESS_VPL = process.env.NEXT_PUBLIC_VPL_PAIR_ADDRESS;
export class CurrencyService {
  public getCurrencyDEX = async () => {
    const t = new Date().getTime();
    const { data } = await axios.get(
      `https://api.dexscreener.com/latest/dex/pairs/bsc/${ADDRESS_VPL}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      },
    );

    return data;
  };
}

export const currencyService = new CurrencyService();
