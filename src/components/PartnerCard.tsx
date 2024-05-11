import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export const PartnerCard = ({
  url,
  title,
  content,
}: {
  url: string;
  title: string;
  content: string;
}) => {
  const { t } = useTranslation();

  return (
    <Link
      href="/coming-soon"
      className="transaction group flex flex-1 flex-col gap-6 duration-300 ease-out hover:scale-105"
    >
      <div className="h-[215px] w-full bg-white" />
      {/* <Image src={url} height={215} width={314} alt="Partner" className="bg-white w-full"/> */}
      <div className="flex flex-col gap-2 group-hover:text-[#dd9933]">
        <h5 className="text-center text-2xl group-hover:text-[#dd9933]">
          {t(`homePage.partnerAndSponsor.${title}`)}
        </h5>
        <span>{t(`homePage.partnerAndSponsor.${content}`)}</span>
      </div>
    </Link>
  );
};
