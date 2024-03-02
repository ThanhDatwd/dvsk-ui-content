import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export const Quartercard = ({
  contentList,
  title,
}: {
  contentList: string[];
  title: string;
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`min-w-1/2 relative flex flex-col gap-6 border-[2px] border-[#C93] bg-[#e7cd96] px-4 xs:pb-5 xs:pt-8 lg:pb-[38px] lg:pt-[66px]`}
    >
      <div className="absolute xs:-top-2 xs:left-8 lg:-top-4 lg:left-[64px]">
        <div className="absolute -top-1 right-0 h-0 w-0 border-b-4 border-b-[#B2811F] border-l-transparent xs:border-l-[65px] lg:border-l-[120px]" />
        <div className="bg-[#B2811F] text-center text-[#FFEBC4] xs:min-w-[65px] xs:pb-[3px] xs:pt-[6px] xs:text-sm lg:min-w-[121px] lg:pb-[6px] lg:pt-[11px] lg:text-xl">
          {t(`homePage.launchRoadmap.${title}`)}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        {contentList.map((content, index) => (
          <span
            key={index}
            className="max-w-full whitespace-break-spaces break-words text-[#17191F]"
          >
            {t(`homePage.launchRoadmap.${content}`)}
          </span>
        ))}
      </div>
      <Link
        href="/coming-soon"
        className="text-right text-xs text-[#716B64] hover:text-[#3B3BFC] hover:underline"
      >
        {t("homePage.character.seeDetails")}
      </Link>
    </div>
  );
};
