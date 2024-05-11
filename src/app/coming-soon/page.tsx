"use client";

import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import Image from "next/image";
import { getStaticURL } from "@/utils/constants";
import LazyLoad from "react-lazyload";
import Loader from "@/components/common/Loader";

export default function ComingSoon() {
  const { t } = useTranslation();
  return (
    <DefaultLayout
      pageTitle="Coming Soon"
      containerStyle="bg-white dark:bg-[#222327]"
    >
      <LazyLoad once={true} placeholder={<Loader />}>
        <div
          className="relative flex h-[100vh] w-full flex-col justify-center gap-[22px] bg-cover text-[40px] xs:mt-0 xs:items-center xs:px-4 xs:py-8 lg:mt-20 "
          style={{
            backgroundImage: `url('${getStaticURL()}/assets/images/comingSoonBanner.jpg')`,
            backgroundPosition: "center",
          }}
        >
          <h2 className="z-10 font-semibold text-white xs:text-[32px] md:text-[64px]">
            {t("comingSoon.title")}
          </h2>
          <div className="z-10 flex w-full flex-col text-center leading-normal text-white xs:items-center xs:gap-1 xs:text-base md:gap-4 md:text-[40px]">
            <span>{t("comingSoon.notifyContent")}</span>
            <span>{t("comingSoon.notifySubContent")}</span>
            <span>{t("comingSoon.comeBackContent")}</span>
          </div>
        </div>
      </LazyLoad>
    </DefaultLayout>
  );
}
