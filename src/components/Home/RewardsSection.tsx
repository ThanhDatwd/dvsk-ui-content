import React from "react";
import { useTranslation } from "react-i18next";
import { RewardsCard } from "../RewardCard";
import { getStaticURL } from "@/utils/constants";
import { TitleSection } from "./TitleSection";
import Link from "next/link";

export const RewardsSection = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-[1504px] flex-col gap-8 bg-primary xs:px-4 xs:py-12 lg:gap-16 lg:py-20">
      <TitleSection title={t("homePage.rewards.title")} />
      <div className="flex justify-center">
        <div className="xs-w-full relative lg:py-[60px]">
          <div className="flex rounded-full border-black outline-dashed xs:h-[180px] xs:w-[180px] xs:items-center xs:justify-center lg:h-[428px] lg:w-[426px]">
            <Link
              href="/coming-soon"
              className="transaction z-10 cursor-pointer rounded-full bg-white duration-300 ease-out hover:scale-125 xs:p-14 lg:h-[255px] lg:w-[255px]"
            />
          </div>
          <div className="absolute xs:-left-[66px] xs:-top-4 xs:h-[214px] xs:w-[312px] lg:-left-[206px] lg:top-0 lg:h-[548px] lg:w-[840px]">
            <div className="flex h-full flex-col justify-between">
              <div className="flex justify-center xs:gap-[180px]  lg:gap-[426px]">
                <RewardsCard url={""} rewardName={t("homePage.rewards.pVP")} />
                <RewardsCard
                  url={`${getStaticURL()}/assets/images/`}
                  rewardName={t("homePage.rewards.loginReceiveRewards")}
                  imageStyle="justify-end"
                  labelStyle="translate-x-1/5"
                />
              </div>
              <div className="flex justify-between">
                <RewardsCard
                  url={`${getStaticURL()}/assets/images/`}
                  rewardName={t("homePage.rewards.tournament")}
                />
                <RewardsCard
                  url={`${getStaticURL()}/assets/images/`}
                  rewardName={t("homePage.rewards.upgrade")}
                  imageStyle="justify-end"
                  labelStyle="translate-x-1/6"
                />
              </div>
              <div className="flex justify-center xs:gap-[180px]  lg:gap-[426px]">
                <RewardsCard
                  url={`${getStaticURL()}/assets/images/`}
                  rewardName={t("homePage.rewards.battleWithMonsters")}
                />
                <RewardsCard
                  url={`${getStaticURL()}/assets/images/`}
                  rewardName={t("homePage.rewards.bossBattle")}
                  imageStyle="justify-end"
                  labelStyle="translate-x-1/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
