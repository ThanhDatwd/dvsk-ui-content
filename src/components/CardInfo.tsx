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
      className={`relative flex w-full min-w-0 flex-col rounded-lg border-0 bg-primary dark:bg-primaryDark ${containerStyle}`}
    >
      {label && (
        <div className="mb-2 rounded-t-2xl border-b border-[#333] py-2">
          <h6 className="text--base mb-0 font-bold text-[#333] dark:text-[#FAFAFA] lg:text-2xl">
            {label}
          </h6>
        </div>
      )}
      <div className={`flex flex-col ${itemWrapperStyle}`}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between text-[#333] dark:text-[#FAFAFA] ${itemStyle}`}
          >
            <div className="flex items-center gap-1">
              {item.keyIcon && item.keyIcon}
              <p className={`${textSize}`}>{t(`${item.label}`)}</p>
            </div>
            <div className="flex cursor-pointer items-center gap-1">
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
