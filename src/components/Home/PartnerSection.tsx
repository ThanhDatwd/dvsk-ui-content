import React from "react";
import { PartnerCard } from "../PartnerCard";
import { useTranslation } from "react-i18next";
import { getStaticURL, partnerData } from "@/utils/constants";
import { TitleSection } from "./TitleSection";

export const PartnerSection = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-[1504px] flex-col  xs:gap-8 lg:gap-16">
      <TitleSection title={t("homePage.partnerAndSponsor.title")} />
      <div className="grid gap-6 xs:grid-cols-1 md:grid-cols-4">
        {partnerData.map((item, index) => (
          <PartnerCard
            key={index}
            url={`${getStaticURL()}/assets/images/`}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
};
