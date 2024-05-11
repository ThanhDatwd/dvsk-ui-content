"use client";

import { THEME } from "@/utils/constants";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface OnboardCtxProps {
  isLoadingBoardingDone: boolean;
  setIsLoadingBoardingDone: Dispatch<SetStateAction<boolean>>;
}

const defaultCtxVal: OnboardCtxProps = {
  isLoadingBoardingDone: false,
  setIsLoadingBoardingDone: (): void => {},
};
export const OnboardCtx = createContext<OnboardCtxProps>(defaultCtxVal);
export const OnboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoadingBoardingDone, setIsLoadingBoardingDone] =
    useState<boolean>(false);

  return (
    <OnboardCtx.Provider
      value={{
        isLoadingBoardingDone,
        setIsLoadingBoardingDone,
      }}
    >
      {children}
    </OnboardCtx.Provider>
  );
};
