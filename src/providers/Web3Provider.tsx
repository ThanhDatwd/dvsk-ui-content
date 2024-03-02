"use client";

import { connectors } from "@/pkgs/augmentlab-wallet-connector/connector";
import { Web3ReactProvider } from "@web3-react/core";

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
};
