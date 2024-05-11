import React, { useEffect, useRef, useState } from "react";
import { TitleSection } from "./TitleSection";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { getStaticURL } from "@/utils/constants";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import LazyLoad from "react-lazyload";
import Loader from "../common/Loader";

export const IntroduceSection = () => {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { t } = useTranslation();
  const handlePlayVideo = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };
  return (
    <div className="mx-auto flex max-w-[1504px] flex-col  gap-8 lg:gap-16">
      <TitleSection title={t("homePage.introduce.title")} />
      <div className="flex flex-col-reverse gap-6  lg:flex-row">
        <div className="flex w-full flex-col gap-4 ">
          <span className="text-[16px]">
            {t("homePage.introduce.paragraphOne")}
          </span>
          <span className="text-[16px]">
            {t("homePage.introduce.paragraphThree")}
          </span>
          <span className="text-[16px]">
            {t("homePage.introduce.paragraphTwo")}
          </span>
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-[#6B0E01] bg-white xs:aspect-video lg:aspect-video">
          <LazyLoad
            className="w-full xs:aspect-video lg:aspect-video"
            once={true}
            placeholder={<Loader />}
          >
            <video
              className="w-full xs:aspect-video lg:aspect-video"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onSeeking={() => {
                videoRef.current.play();
              }}
              ref={videoRef}
              controls={isPlaying}
              autoPlay
              muted
              loop
              src={`${getStaticURL()}/assets/videos/trailer.mp4`}
            />
          </LazyLoad>
          <div
            onClick={handlePlayVideo}
            className={`absolute left-[50%] top-[50%] h-[80px] w-[80px] translate-x-[-50%] translate-y-[-50%]  ${
              isPlaying ? "" : "cursor-pointer"
            } `}
          >
            <div
              className={`flex h-full  w-full items-center justify-center rounded-[50%] border-[5px] border-[#fff] duration-300  ease-in-out hover:scale-110 hover:border-[#bfbfbf]  ${
                isPlaying ? "opacity-0" : "opacity-1"
              }`}
            >
              <PlayIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
