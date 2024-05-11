"use client";
import { DevelopmentTeamSection } from "@/components/Home/DevelopmentTeamSection";
import { FigureSection } from "@/components/Home/FigureSection";
import { HerroSection } from "@/components/Home/HerroSection";
import { IntroduceSection } from "@/components/Home/IntroduceSection";
import { LaunchRoadmapSection } from "@/components/Home/LaunchRoadmapSection";
import { NewsSection } from "@/components/Home/NewsSection";
import { PartnerSection } from "@/components/Home/PartnerSection";
import { RewardsSection } from "@/components/Home/RewardsSection";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScroll(true);
        return;
      }
      setIsScroll(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <DefaultLayout
      pageTitle="Dashboard"
      containerStyle="bg-[#F0EDE7] dark:bg-[#222327]"
      headerStyle={`${!isScroll && "bg-[transparent]"} ${!isScroll && "py-4"} `}
      linkStyle={`${
        !isScroll
          ? "text-[#6B0E01] hover:after:border-[#6B0E01]"
          : "text-[#fff] hover:after:border-[#dd9933]"
      } `}
    >
      <HerroSection />
      <div className="bg-[#D9D4D4] xs:p-4 lg:px-14 lg:py-20">
        <IntroduceSection />
      </div>
      {/* <div className="lg:py-20">
        <NewsSection />
      </div> */}
      <div className="xs:p-4 lg:px-14 lg:py-20  ">
        <FigureSection />
      </div>
      <div>
        <LaunchRoadmapSection />
      </div>
      {/* <RewardsSection />
      <div className="">
        <DevelopmentTeamSection />
      </div>
      <section
        id="partner"
        className="bg-primary xs:px-4 xs:py-8 md:px-14 md:py-20"
      >
        <PartnerSection />
      </section> */}
    </DefaultLayout>
  );
}
