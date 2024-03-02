import Web3 from "web3";

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
declare const window: any;

const initialWeb3 = () => {
  let web3 = new Web3();
  if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }
  return web3;
};

export default initialWeb3;
