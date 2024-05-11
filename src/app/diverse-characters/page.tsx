"use client";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { StarIcon } from "@/assets/icons/StarIcon";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { CharacterCard } from "@/components/CharacterCard";
import { character, getStaticURL } from "@/utils/constants";
import Link from "next/link";

export default function Home() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const starsQuantity = ["3", "4", "5"];

  return (
    <DefaultLayout
      pageTitle="Dashboard"
      containerStyle="bg-white dark:bg-[#222327]"
    >
      <div className="mt-20 flex flex-col bg-primary xs:gap-8 xs:px-4 xs:pb-8 md:gap-20 md:px-14 md:py-20">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center font-amatica text-[64px] font-bold text-[#17191F]">
            {t("diverseCharacters.title")}
          </h2>
          <span className="text-center text-[#17191F] xs:w-2/3 md:w-1/3">
            {t("diverseCharacters.subTitle")}
          </span>
        </div>
        <div className="flex flex-col xs:gap-8 md:gap-[60px]">
          <div className="flex gap-6 xs:flex-col md:flex-row ">
            <div className="btn flex flex-1 gap-2 border border-[#9B968E] p-2">
              <span />
              <SearchIcon className="z-10 cursor-pointer" />
              <input
                type="text"
                placeholder={t("diverseCharacters.searchPlaceholder")}
                className="z-10 flex-1 border-none bg-transparent outline-none placeholder:text-[#828282]"
              />
              <div className="search">
                <span />
              </div>
            </div>
            <div className="flex items-center gap-[11px]">
              <span>{t("diverseCharacters.strength")}</span>
              <div className="flex gap-1">
                {starsQuantity.map((star, index) => (
                  <Link
                    href="/coming-soon"
                    key={index}
                    className={`flex items-center gap-2 rounded-lg py-[6px] pl-4 pr-2 ${
                      index == 0
                        ? "border-none bg-[#6B0E01] text-white"
                        : "border border-[#6B0E01] bg-transparent text-[#6B0E01]"
                    }`}
                  >
                    <span>{star}</span>
                    <StarIcon color={index == 0 ? "#D9D9D9" : "#6B0E01"} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-6 xs:grid-cols-1 md:grid-cols-4">
            {character.map((item, index) => (
              <CharacterCard
                key={index}
                linkTo={`/character/tran-hung-dao`}
                characterName={item.name}
                rate={item.star}
                url={`${getStaticURL()}/assets/images/characterImage.svg`}
                value=""
              />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
