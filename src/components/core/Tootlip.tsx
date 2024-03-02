"use client";

import { DropdownIconUp } from "@/assets/icons/DropdownIcon";
import { useTheme } from "@/hooks/useTheme";
import { isDarkTheme } from "@/utils/theme";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  options: { label: string; link: string }[];
  onChange: (value: string) => void;
  className?: string;
  classNameDropdown?: string;
  hideIcon?: boolean;
  tooltipStyle?: string;
}

export const Tooltip: FC<Props> = ({
  title,
  options,
  onChange,
  className,
  hideIcon,
  tooltipStyle = "bg-white dark:bg-primaryDark",
}) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const ClickOutside = (ref: any, onClickOutside: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
  };
  ClickOutside(ref, () => {
    setIsShowTooltip(false);
  });
  return (
    <div className="group relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setIsShowTooltip(!isShowTooltip)}
        type="button"
        className={`text-md inline-flex h-[28px] w-full items-center justify-center gap-1 whitespace-nowrap rounded-lg px-1 py-1 hover:text-[#3B3BFC] dark:hover:text-[#DA6C1D] ${className}`}
      >
        <span className="mb-1">{t(`${title}.title`)}</span>
        <span className={isShowTooltip ? "rotate-180" : ""}>
          <DropdownIconUp color={isDarkTheme(theme) ? "#ffffff" : "#000000"} />
        </span>
      </button>
      <div
        className={`absolute top-[28px] z-10 px-5 py-10 ${
          isShowTooltip ? "opacity-100" : ""
        } ${
          isShowTooltip ? "visible" : "invisible"
        } rounded-md ${tooltipStyle} shadow-lg focus:outline-none`}
      >
        <div className="flex flex-col gap-2">
          {options.map((option, i) => (
            <Link
              href={option.link ?? "/"}
              key={i}
              className={`block whitespace-nowrap px-4 py-2 text-start text-sm hover:text-[#3B3BFC]`}
            >
              {t(`${title}.${option.label}`)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
