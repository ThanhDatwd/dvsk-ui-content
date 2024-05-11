"use client";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import "../../../i18n";

export const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <div className={`py-20 px-4 flex flex-col gap-10 max-w-[1504px] mx-auto`}>
      Footer
    </div>
  );
};
