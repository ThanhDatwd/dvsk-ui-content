import { CONTRACT_ADDRESS, IAbis } from "../token";
import {
  getContract,
  getGasPriceAndGasLimit,
  useConnectorByName,
} from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";
import { ADDRESS_NULL, Currencies } from "@/utils/constants";
import {
  convertBalanceDecimalToNumber,
  convertNumberToBalanceDecimal,
} from "@/utils/converter";
import { waitTransaction } from "@/utils/transactionHelpers";
import contractJson from "@/web3/abi/VinachainPoint.json";
import { MaxUint256 } from "@ethersproject/constants";
import Web3 from "web3";
import { core } from "./useQuicknode";
import initialWeb3 from "./useWeb3";
export type TransferUsc = {
  from: string;
  to: string;
  transactionHash: string;
};
export const useToken = () => {
  const { connectorName } = useAugmentlabsWalletContext();
  const {
    hook,
    connector: { provider },
  } = useConnectorByName(connectorName);
  const networkSeleted = hook.useChainId() as E_NETWORK_ID;
  const account = hook.useAccount();

  const getBalance = async (
    token: string,
    contractAbi: IAbis,
  ): Promise<string> => {
    if (!account || !networkSeleted) throw new Error("Please connect wallet");
    const contract = getContract(provider, contractAbi, token);

    const balance = await contract.methods.balanceOf(account).call();
    return balance;
  };

  const getDecimals = async (
    token: string,
    contractJson: IAbis,
  ): Promise<number> => {
    const contract = getContract(provider, contractJson, token);
    const decimals = await contract.methods.decimals().call();
    return decimals;
  };

  const purchase = async (
    amount: string,
    referrerAddress: string,
  ): Promise<string> => {
    if (!account || !networkSeleted) throw new Error("Please connect wallet");

    const address = CONTRACT_ADDRESS.VINACHAIN[networkSeleted] as string;

    const contract = getContract(provider, contractJson, address);
    const { gasLimit, gasPrice } = await getGasPriceAndGasLimit(provider);
    const balance = await contract.methods
      .purchasePoints(amount, referrerAddress || ADDRESS_NULL)
      .send({ from: account, gasLimit, gasPrice });
    return balance;
  };

  const checkAllowance = async (
    token: string,
    contractJson: IAbis,
  ): Promise<string> => {
    const contract = getContract(provider, contractJson, token);
    const allowance = await contract.methods
      .allowance(account, CONTRACT_ADDRESS.VINACHAIN[networkSeleted])
      .call();
    return allowance;
  };

  const approve = async (
    token: string,
    contractJson: IAbis,
  ): Promise<boolean> => {
    const contract = getContract(provider, contractJson, token);
    const { gasLimit, gasPrice } = await getGasPriceAndGasLimit(provider);

    await contract.methods
      .approve(
        CONTRACT_ADDRESS.VINACHAIN[networkSeleted],
        MaxUint256.toString(),
      )
      .send({ from: account, gasLimit, gasPrice });

    return true;
  };

  const totalSupply = async (address: string): Promise<string> => {
    const contract = getContract(provider, contractJson, address);
    const totalSupply = await contract.methods.totalSupply().call();

    return totalSupply;
  };

  const getReferralReward = async (): Promise<string> => {
    const address = CONTRACT_ADDRESS.VINACHAIN[networkSeleted] as string;

    const contract = getContract(provider, contractJson, address);
    const totalSupply = await contract.methods
      .viewReferralReward()
      .call({ from: account });
    return totalSupply;
  };

  const getReferrer = async (): Promise<string> => {
    if (!account || !networkSeleted) throw new Error("Please connect wallet");

    const address = CONTRACT_ADDRESS.VINACHAIN[networkSeleted] as string;

    const contract = getContract(provider, contractJson, address);
    const totalSupply = await contract.methods
      .viewReferrer()
      .call({ from: account });
    return totalSupply;
  };

  const totalSupplyNotConnectWallet = async (): Promise<string> => {
    const web3 = initialWeb3();
    const methodHash = web3.eth.abi.encodeFunctionSignature("totalSupply()");

    const response: any = await core.client.call({
      account: ADDRESS_NULL,
      data: methodHash as `0x${string}`,
      to: process.env.NEXT_PUBLIC_VINACHAIN_ADDRESS as `0x${string}`,
    });

    const decodedData = web3.eth.abi.decodeParameters(
      ["uint256"],
      response.data,
    );

    const totalSupplyValue = decodedData[0];

    return totalSupplyValue.toString();
  };

  const decimalNotConnectWallet = async (): Promise<number> => {
    const web3 = initialWeb3();
    const methodHash = web3.eth.abi.encodeFunctionSignature("decimals()");

    const response: any = await core.client.call({
      account: ADDRESS_NULL,
      data: methodHash as `0x${string}`,
      to: process.env.NEXT_PUBLIC_VINACHAIN_ADDRESS as `0x${string}`,
    });

    const decodedData = web3.eth.abi.decodeParameters(
      ["uint256"],
      response.data,
    );

    const totalSupplyValue = decodedData[0];

    return Number(totalSupplyValue);
  };

  return {
    getBalance,
    getDecimals,
    purchase,
    approve,
    checkAllowance,
    getReferralReward,
    totalSupply,
    getReferrer,
    totalSupplyNotConnectWallet,
    decimalNotConnectWallet,
  };
};
