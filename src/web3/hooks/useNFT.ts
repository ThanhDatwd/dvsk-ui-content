import {
  getContract,
  useConnectorByName,
} from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";
import nftContractJson from "@/web3/abi/erc721.json";
import { CONTRACT_ADDRESS } from "../token";

export const useNFT = () => {
  const { connectorName } = useAugmentlabsWalletContext();
  const {
    hook,
    connector: { provider },
  } = useConnectorByName(connectorName);
  const networkSeleted = hook.useChainId() as E_NETWORK_ID;
  const account = hook.useAccount();

  const getNFTQuantity = async (tokenId: string): Promise<string> => {
    if (!account || !networkSeleted) throw new Error("Please connect wallet");
    const address = CONTRACT_ADDRESS.NFT[networkSeleted];
    const contract = getContract(provider, nftContractJson, address as string);

    const balance = await contract.methods.balanceOf(account, tokenId).call();
    return balance;
  };

  return {
    getQuantity: getNFTQuantity,
  };
};
