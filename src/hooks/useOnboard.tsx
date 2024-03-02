"use client";

import { OnboardCtx } from "@/providers/OnboardProvider";
import { useContext } from "react";

export const useOnboard = () => {
  const { isLoadingBoardingDone, setIsLoadingBoardingDone } =
    useContext(OnboardCtx);

  return {
    isLoadingBoardingDone,
    setIsLoadingBoardingDone,
  };
};
