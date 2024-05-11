import React, { useRef, useState } from "react";
import Image from "next/image";
import { TitleSection } from "./TitleSection";
import ReactApexChart from "react-apexcharts";
import { Radar } from "react-chartjs-2";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { ArrowNextIcon } from "@/assets/icons/ArrowNextIcon";
import { ArrowRightIcon } from "@/assets/icons/ArrowRightIcon";
import { useTranslation } from "react-i18next";
import { character, getStaticURL, listCharacter } from "@/utils/constants";
import { LineIcon } from "@/assets/icons/LineIcon";
import SceneModel from "../SceneModel";
import LazyLoad from "react-lazyload";
import Loader from "../common/Loader";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);
export const FigureSection = () => {
  const { t } = useTranslation();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [characterList, setCharacterList] = useState<any[]>(
    listCharacter.filter((character) => character.value !== ""),
  );
  const data: any = {
    labels: [
      t("homePage.figure.attack"),
      t("homePage.figure.criticalStrike"),
      t("homePage.figure.support"),
      t("homePage.figure.control"),
      t("homePage.figure.defense"),
    ],
    datasets: [
      {
        data: [7, 3, 3, 5, 4],
        backgroundColor: "rgba(112, 100, 76, 0.70)",
      },
    ],
  };
  const options: any = {
    scales: {
      r: {
        ticks: {
          display: false,
          beginAtZero: true,
          max: 10,
          min: 0,
          stepSize: 2,
          font: {
            size: 6,
          },
        },
        min: 0,
        pointLabels: {
          font: {
            size: 12,
            family: "Merriweather",
          },
          color: "#867358",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 0,
      },
      point: {
        tension: 3,
        borderWidth: 0,
        radius: 0, // Set the point radius to 0 to hide markers
      },
    },
    tooltip: {
      enabled: false, // Disable tooltips
    },
  };

  return (
    <div className="mx-auto flex max-w-[1504px] flex-col gap-8 lg:gap-16">
      <TitleSection title={t("homePage.figure.title")} />
      {/* <div className="relative bg-[red]"> */}
      <Swiper
        modules={[Pagination, Navigation]}
        className="mySwiper"
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        allowTouchMove={false}
      >
        {characterList.map((character, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:px-20">
              <div className="relative border border-[#9B968E] bg-[#DCD3C9] p-2">
                <div className=" absolute left-0 top-0 z-10 flex w-full justify-between">
                  <div className="h-[20px] w-[20px] border-b border-r border-[#9B968E]"></div>
                  <div className="h-[20px] w-[20px] border-b border-l border-[#9B968E]"></div>
                </div>
                <div className="relative flex h-full flex-col justify-center gap-4 border border-[#9B968E] bg-[#DCD3C9] p-4">
                  <div className="text-center  ">
                    <h4 className=" flex flex-col items-center justify-center text-[24px] font-medium text-[#17191F]">
                      {character.name}
                      <LineIcon />
                    </h4>
                    <span className="line-clamp-3">
                      {t(`introduceCharacter.${character.value}.introduce1`)}
                    </span>
                  </div>
                  <div className="w-full  ">
                    <LazyLoad once={true} placeholder={<Loader />}>
                      <Radar data={data} options={options} />
                    </LazyLoad>
                  </div>
                </div>
                <div className=" absolute bottom-0 left-0 z-10 flex w-full justify-between">
                  <div className="h-[20px] w-[20px] border-r border-t border-[#9B968E]"></div>
                  <div className="h-[20px] w-[20px] border-l border-t border-[#9B968E]"></div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-[#ffff] xs:order-first md:min-h-[540px] lg:order-none">
                <div className=" w-full min-w-[100px]">
                  <LazyLoad once={true} placeholder={<Loader />}>
                    <SceneModel
                      character={character.value}
                      scale={character.scale}
                      autoRotate={false}
                      enableZoom={false}
                    />
                  </LazyLoad>
                </div>
                {/* <Image src="" height={100} width={100} alt="Hình Ảnh Trần Hưng Đạo" className="w-full h-full"/> */}
              </div>
              <div className="">
                <div className="flex flex-col gap-4  py-8 ">
                  {character.introduces.map(
                    (content: string, index: string) => (
                      <span key={index}>
                        -{" "}
                        {t(
                          `introduceCharacter.${character.value}.introduce${
                            index + 1
                          }`,
                        )}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <button
          ref={nextRef}
          className="absolute right-[0px] top-[50%] z-10 -translate-y-[50%] rotate-180 "
        >
          <ArrowRightIcon color="#6B0E01" />
        </button>
        <button
          ref={prevRef}
          className="absolute left-[0px] top-[50%] z-10 -translate-y-[50%]  "
        >
          <ArrowRightIcon color="#6B0E01" />{" "}
        </button>
      </Swiper>
      {/* </div> */}
    </div>
  );
};
