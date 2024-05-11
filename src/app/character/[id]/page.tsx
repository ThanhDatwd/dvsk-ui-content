"use client";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { StarBoldIcon } from "@/assets/icons/StarBoldIcon";
import { getStaticURL, listCharacter } from "@/utils/constants";
import SceneModel from "@/components/SceneModel";
import { useParams, useSearchParams } from "next/navigation";
import LazyLoad from "react-lazyload";
import Loader from "@/components/common/Loader";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const CharacterPage = () => {
  const [currentFigure, setCurrentFigure] = useState<any>();
  const params = useParams();
  const { t } = useTranslation();
  useEffect(() => {
    if (params && params.id) {
      const newFigure = [...listCharacter].find(
        (character) => character.slug === params.id,
      );
      setCurrentFigure(newFigure);
    }
  }, [params]);

  const data: any = {
    labels: ["Tấn công", "Chí mạng", "Hỗ trợ", "Khống chế", "Phòng thủ"],
    datasets: [
      {
        data: currentFigure?.dataSet,
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
            size: 12, // Adjust the font size of the legend labels
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

  const options2: any = {
    elements: {
      line: {
        tension: 0, // Để làm cho đường thẳng hơn
      },
    },
    scale: {
      ticks: {
        stepSize: 5,
      },
    },
    plugins: {
      legend: {
        labels: {
          fontColor: "red", // Màu cho chú thích
        },
      },
    },
  };
  return (
    <DefaultLayout
      pageTitle="Dashboard"
      containerStyle="bg-white dark:bg-[#222327]"
    >
      <div className="mx-[auto] flex w-[1050px] max-w-full flex-col gap-6 py-20 pt-20 xs:px-3 lg:gap-20 lg:px-14 lg:pt-40 ">
        <div className="grid grid-cols-12">
          <div className="xs:col-span-12 lg:col-span-5">
            <h4 className="text-[32px] font-medium ">{currentFigure?.name}</h4>
            <div className="flex">
              {Array.from({ length: currentFigure?.rate || 5 }, (_, index) => (
                <StarBoldIcon key={index} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 items-start xs:col-span-12 xs:gap-2 lg:col-span-7 lg:gap-6">
            <div className="col-span-1">
              <Radar data={data} options={options} />
            </div>
            <div className="col-span-1 flex h-full min-h-[330px] flex-col justify-center overflow-hidden rounded bg-[#D9D9D9]">
              <LazyLoad once={true} placeholder={<Loader />}>
                {currentFigure && (
                  <>
                    {currentFigure?.value !== "" ? (
                      <div className="max-h-[330px] w-full min-w-[100px] overflow-hidden pt-[0px]">
                        <SceneModel
                          character={currentFigure.value}
                          scale={currentFigure.scale}
                          autoRotate={false}
                          enableZoom={false}
                        />
                      </div>
                    ) : (
                      <div
                        className="h-[320px] w-full min-w-[100px]  pt-[0px] "
                        style={{
                          backgroundImage: `url('${getStaticURL()}/assets/images/2d/${currentFigure?.url}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                  </>
                )}
              </LazyLoad>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7 bg-[#DCD3C9] p-6 ">
          <div>
            <div className="mb-2 text-[#78542C]">
              {t("characterPage.introduce.title")}
            </div>
            <div className="relative h-[2px] w-full bg-[#C4B7A8]">
              <div className="absolute left-0 top-[50%] h-[8px] w-[8px] -translate-y-[50%] rotate-45 bg-[#C4B7A8]"></div>
              <div className="absolute right-0 top-[50%] h-[8px] w-[8px] -translate-y-[50%] rotate-45 bg-[#C4B7A8]"></div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {currentFigure?.introduces.map((content: string, index: number) => (
              <span key={index} className="text-[#716B64]">
                - {content}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7 bg-[#DCD3C9] p-6">
          <div>
            <div className="mb-2 text-[#78542C]">
              {t("characterPage.skill.title")}
            </div>
            <div className="relative h-[2px] w-full bg-[#C4B7A8]">
              <div className="absolute left-0 top-[50%] h-[8px] w-[8px] -translate-y-[50%] rotate-45 bg-[#C4B7A8]"></div>
              <div className="absolute right-0 top-[50%] h-[8px] w-[8px] -translate-y-[50%] rotate-45 bg-[#C4B7A8]"></div>
            </div>
          </div>
          <div className="flex gap-6 xs:overflow-x-auto md:overflow-visible">
            <div className=" flex cursor-pointer flex-col items-center gap-4 duration-300 ease-linear hover:translate-y-[-5px]">
              {/* <Image
                src={""}
                alt="skill"
                width={100}
                height={100}
                className="rounded-[50%] bg-white"
              /> */}
              <div className="h-[100px] w-[100px] rounded-[50%] bg-white"></div>
              <span>{t("characterPage.skill.title")} 1</span>
            </div>
            <div className=" flex cursor-pointer flex-col items-center gap-4 duration-300 ease-linear hover:translate-y-[-5px]">
              {/* <Image
                src={""}
                alt="skill"
                width={100}
                height={100}
                className="rounded-[50%] bg-white"
              /> */}
              <div className="h-[100px] w-[100px] rounded-[50%] bg-white"></div>
              <span>{t("characterPage.skill.title")} 2</span>
            </div>
            <div className=" flex cursor-pointer flex-col items-center gap-4 duration-300 ease-linear hover:translate-y-[-5px]">
              {/* <Image
                src={""}
                alt="skill"
                width={100}
                height={100}
                className="rounded-[50%] bg-white"
              /> */}
              <div className="h-[100px] w-[100px] rounded-[50%] bg-white"></div>
              <span>{t("characterPage.skill.title")} 3</span>
            </div>
            <div className=" flex cursor-pointer flex-col items-center gap-4 duration-300 ease-linear hover:translate-y-[-5px]">
              {/* <Image
                src={""}
                alt="skill"
                width={100}
                height={100}
                className="rounded-[50%] bg-white"
              /> */}
              <div className="h-[100px] w-[100px] rounded-[50%] bg-white"></div>
              <span>{t("characterPage.skill.title")} 4</span>
            </div>
            <div className=" flex cursor-pointer flex-col items-center gap-4 duration-300 ease-linear hover:translate-y-[-5px]">
              {/* <Image
                src={""}
                alt="skill"
                width={100}
                height={100}
                className="rounded-[50%] bg-white"
              /> */}
              <div className="h-[100px] w-[100px] rounded-[50%] bg-white"></div>
              <span> {t("characterPage.skill.ulti")}</span>
            </div>
          </div>
          <div className="ư-full grid grid-cols-12 gap-6 rounded-[16px] border border-[#CABEB0] p-6">
            <div className="aspect-video xs:col-span-12 lg:col-span-5">
              <div className="polygon relative h-full w-full overflow-hidden bg-white">
                <div className="polygon-child absolute left-[2px] top-[2px]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6 xs:col-span-12 lg:col-span-7 ">
              <span className="text-[24px] font-medium text-[#78542C]">
                {t("characterPage.skill.title")}
              </span>
              <div>
                <div className="mb-2 text-[#78542C]">
                  {t("characterPage.skill.intrinsic.title")}
                </div>
                <span className="text-[#716B64]">
                  {t("characterPage.skill.intrinsic.content")}
                </span>
              </div>
              <div>
                <div className="mb-2 text-[#78542C]">
                  {t("characterPage.skill.activated.title")}
                </div>
                <span className="text-[#716B64]">
                  {t("characterPage.skill.activated.content")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CharacterPage;
