"use client";

import { ArrowRightIcon } from "@/assets/icons/ArrowRightIcon";
import { useTheme } from "@/hooks/useTheme";
import { chooseTheme, isDarkTheme } from "@/utils/theme";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  options: {
    label: string;
    link: string;
  }[];
};

export const MenuDropdown: FC<Props> = ({ title, options }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <div>
      <div className="flex w-full justify-between" onClick={toggleShow}>
        <p className="text-lg font-bold">{t(`${title}.title`)}</p>
        <div className={`${show ? "rotate-90" : ""} duration-300`}>
          <ArrowRightIcon color={chooseTheme(theme, "#000", "#fff")} />
        </div>
      </div>
      <div
        className={`p-4  md:p-8 ${
          show ? "flex" : "hidden"
        } w-full flex-col gap-3 transition duration-300 md:gap-6 ${chooseTheme(
          theme,
          "#000",
          "#fff",
        )} `}
      >
        {options.map((option, index) => {
          return (
            <Link href={option.link} key={index} className="w-full">
              {t(`${title}.${option.label}`)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
