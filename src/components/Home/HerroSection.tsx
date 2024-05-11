/* eslint-disable @next/next/no-img-element */
import { APKIcon } from "@/assets/icons/APKIcon";
import { AppleIcon } from "@/assets/icons/AppleIcon";
import { GooglePlayIcon } from "@/assets/icons/GooglePlayIcon";
import { WindowIcon } from "@/assets/icons/WindowIcon";
import { getStaticURL, applications, appName } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import LazyLoad from "react-lazyload";
import Loader from "../common/Loader";

export const HerroSection = () => {
  const { t } = useTranslation();

  const checkApp = (app: string) => {
    switch (app) {
      case appName.appStore:
        return <AppleIcon />;
      case appName.googlePlay:
        return <GooglePlayIcon />;
      case appName.window:
        return <WindowIcon />;
      case appName.apk:
        return <APKIcon />;
      default:
        break;
    }
  };

  return (
    <div
      className="relative bg-cover"
      style={{
        backgroundImage: `url('${getStaticURL()}/assets/images/banner.jpg')`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="absolute bottom-0 left-0 z-10 w-full">
        <svg
          className="nectar-shape-divider"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
        >
          <path
            className="opacity-[0.1]"
            d="M 1014 264 v 122 h -808 l -172 -86 s 310.42 -22.84 402 -79 c 106 -65 154 -61 268 -12 c 107 46 195.11 5.94 275 137 z"
          ></path>
          <path
            className="opacity-[0.12]"
            d="M -302 55 s 235.27 208.25 352 159 c 128 -54 233 -98 303 -73 c 92.68 33.1 181.28 115.19 235 108 c 104.9 -14 176.52 -173.06 267 -118 c 85.61 52.09 145 123 145 123 v 74 l -1306 10 z"
          ></path>
          <path
            className="opacity-[0.18]"
            d="M -286 255 s 214 -103 338 -129 s 203 29 384 101 c 145.57 57.91 178.7 50.79 272 0 c 79 -43 301 -224 385 -63 c 53 101.63 -62 129 -62 129 l -107 84 l -1212 12 z"
          ></path>
          <path
            className="opacity-[0.33]"
            d="M -24 69 s 299.68 301.66 413 245 c 8 -4 233 2 284 42 c 17.47 13.7 172 -132 217 -174 c 54.8 -51.15 128 -90 188 -39 c 76.12 64.7 118 99 118 99 l -12 132 l -1212 12 z"
          ></path>
          <path
            className="opacity-[1]"
            d="M -12 201 s 70 83 194 57 s 160.29 -36.77 274 6 c 109 41 184.82 24.36 265 -15 c 55 -27 116.5 -57.69 214 4 c 49 31 95 26 95 26 l -6 151 l -1036 10 z"
          ></path>{" "}
        </svg>
      </div>

      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center ">
        <LazyLoad
          className="h-[324px] w-[324px]"
          once={true}
          placeholder={<Loader />}
        >
          <Image
            className="h-[324px] w-[324px]"
            src={`${getStaticURL()}/assets/images/logo.png`}
            alt="logo"
            width={324}
            height={324}
          />
        </LazyLoad>
        <div className=" relative z-20 grid grid-cols-2 flex-wrap gap-4 lg:grid-cols-4">
          <Link
            href={"/coming-soon"}
            className="duration-300 ease-out hover:scale-110"
          >
            <button className="transaction flex w-full items-center justify-center gap-2 bg-[#6B0E01] px-4 py-2 text-[14px] text-[#fff] duration-300 ease-out hover:scale-110">
              <AppleIcon /> Appstore
            </button>
          </Link>
          <Link href={"/coming-soon"}>
            <button className="transaction flex w-full items-center justify-center gap-2 bg-[#6B0E01] px-4 py-2 text-[14px] text-[#fff] duration-300 ease-out hover:scale-110">
              <GooglePlayIcon /> Google Play
            </button>
          </Link>
          <Link href={"/coming-soon"}>
            <button className="transaction flex w-full items-center justify-center gap-2 bg-[#6B0E01] px-4 py-2 text-[14px] text-[#fff] duration-300 ease-out hover:scale-110">
              <WindowIcon /> Window
            </button>
          </Link>
          <Link href={"/coming-soon"}>
            <button className="transaction flex w-full items-center justify-center gap-2 bg-[#6B0E01] px-4 py-2 text-[14px] text-[#fff] duration-300 ease-out hover:scale-110">
              <APKIcon /> APK
            </button>
          </Link>
        </div>
        <div className="absolute bottom-4 z-20 flex items-center gap-2 rounded bg-[#111] p-1 xs:right-4 xs:w-[50%] md:w-[300px] lg:right-8">
          <div className="rounded bg-white  p-2 leading-snug lg:text-[32px]">
            18+
          </div>
          <div className="border-l border-[#FAFAFA] pr-1 text-center leading-snug text-[#FAFAFA] xs:text-[10px] lg:text-[16px]">
            {t("header.warning")}
          </div>
        </div>
      </div>
    </div>
  );
};
