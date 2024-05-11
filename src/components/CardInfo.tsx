"use client";

import { CopyIcon } from "@/assets/icons/CopyIcon";
import { useTheme } from "@/hooks/useTheme";
import { onToast } from "@/hooks/useToast";
import { THEME } from "@/utils/constants";
import { convertString } from "@/utils/convertString";
import { DataSectionProps } from "@/utils/type";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface CardInfoProps {
  label?: string;
  data: DataSectionProps[];
  textSize?: string;
  containerStyle?: string;
  itemWrapperStyle?: string;
  itemStyle?: string;
  onClickValue?: () => void;
}

export const CardInfo: FC<CardInfoProps> = ({
  label,
  data,
  textSize = "text-xs lg:text-base",
  itemWrapperStyle,
  itemStyle,
  containerStyle,
  onClickValue,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value ?? "")
      .then(() => onToast("You successfully copied", "success"));
  };

  return (
    <div
      className={`relative flex flex-col min-w-0 bg-primary dark:bg-primaryDark w-full border-0 rounded-lg ${containerStyle}`}
    >
      {label && (
        <div className="py-2 border-b border-[#333] rounded-t-2xl mb-2">
          <h6 className="mb-0 text--base lg:text-2xl text-[#333] dark:text-[#FAFAFA] font-bold">
            {label}
          </h6>
        </div>
      )}
      <div className={`flex flex-col ${itemWrapperStyle}`}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center text-[#333] dark:text-[#FAFAFA] ${itemStyle}`}
          >
            <div className="flex gap-1 items-center">
              {item.keyIcon && item.keyIcon}
              <p className={`${textSize}`}>{t(`${item.label}`)}</p>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              <p className={`${textSize}`}>
                {item.short ? convertString(item.value ?? "") : item.value}
              </p>
              {item.isCopyable && (
                <span
                  onClick={() => {
                    handleCopy(item.value ?? "");
                  }}
                >
                  <CopyIcon color={theme === THEME.DARK ? "#FAFAFA" : "#333"} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
