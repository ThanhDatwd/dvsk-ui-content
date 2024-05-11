import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Quartercard } from "../QuarterCard";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { getStaticURL, launchInfo, timerData } from "@/utils/constants";
import Image from "next/image";
import { TitleSection } from "./TitleSection";

export const LaunchRoadmapSection = () => {
  const { t } = useTranslation();
  const [actived, setActived] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleQuater = (index: number) => {
    setActived(index);
    const offetWidth = containerRef.current?.offsetWidth || 0;
    switch (index) {
      case 0:
        handleScrollTo(0);
        break;
      case 1:
        handleScrollTo(offetWidth);
        break;
      case 2:
        handleScrollTo(offetWidth * 2);
        break;
      case 3:
        handleScrollTo(offetWidth * 3);
        break;
      default:
        break;
    }
  };

  const handleScrollLeft = () => {
    const offetWidth = containerRef.current?.offsetWidth || 0;
    if (containerRef.current) {
      const currentPosition = containerRef.current.scrollLeft;
      if (currentPosition <= 0) {
        setActived(0);
        return;
      }
      if (currentPosition <= offetWidth) {
        setActived(1);
        return;
      }
      if (currentPosition <= offetWidth * 2) {
        setActived(2);
        return;
      }

      if (currentPosition <= offetWidth * 3) {
        setActived(3);
        return;
      }
    }
  };

  useEffect(() => {
    const containerCurrent = containerRef.current;
    if (containerCurrent) {
      containerCurrent.addEventListener("scroll", handleScrollLeft);
      return () => {
        // Cleanup: Remove the event listener when the component is unmounted
        if (containerCurrent) {
          containerCurrent.removeEventListener("scroll", handleScrollLeft);
        }
      };
    }
  }, []);

  return (
    <div
      className={` relative flex flex-col gap-8 scroll-smooth bg-cover xs:px-4 xs:py-8 md:px-14 md:py-20`}
      style={{
        backgroundImage: `url('${getStaticURL()}/assets/images/roadMapBgImage.jpg')`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TitleSection title={t("homePage.launchRoadmap.title")} />
      <div className="z-10 flex w-full flex-col xs:gap-8 lg:gap-16">
        <div className="flex items-center justify-center gap-6">
          {timerData.map((item, index) => (
            <div key={index} className="flex xs:gap-3 md:gap-12">
              <div className="flex flex-col items-center">
                <span className="font-bold xs:text-xs md:text-2xl">{item}</span>
                <div
                  onClick={() => handleQuater(index)}
                  className={`cursor-pointer rounded-full border border-[#17191F] xs:h-3 xs:w-3 md:h-6 md:w-6 ${
                    index === actived ? "bg-[#6B0E01]" : "bg-[#FAFAFA]"
                  }`}
                />
              </div>
              {timerData.length - 1 === index ? <></> : <ArrowIcon />}
            </div>
          ))}
        </div>
        <div
          ref={containerRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-scroll scroll-smooth whitespace-nowrap"
        >
          {launchInfo.map((item, index) => (
            <div
              key={index}
              className=" z-10 flex w-full min-w-full snap-center flex-col items-center text-white xs:gap-4 lg:gap-8"
            >
              <span className="text-center font-bold text-[#17191F] xs:text-xl md:text-[32px]">
                {item.quater}
              </span>
              <div className="flex w-full pt-8 xs:flex-col xs:gap-12 md:flex-row md:gap-6 lg:px-[153px]">
                <div className="grid w-full xs:grid-cols-1 xs:gap-3 lg:grid-cols-2 lg:gap-6">
                  {item.data.map((item, index) => (
                    <Quartercard
                      key={index}
                      contentList={item.infos}
                      title={item.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
