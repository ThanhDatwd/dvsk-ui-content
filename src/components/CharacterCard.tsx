/* eslint-disable @next/next/no-img-element */
import { StarBoldIcon } from "@/assets/icons/StarBoldIcon";
import Link from "next/link";
import React from "react";
import SceneModel from "./SceneModel";
import { getStaticURL } from "@/utils/constants";
import Image from "next/image";
import LazyLoad from "react-lazyload";
import Loader from "./common/Loader";
import { t } from "i18next";

export const CharacterCard = ({
  linkTo,
  url,
  characterName,
  rate,
  value,
}: {
  linkTo: string;
  url: string;
  characterName: string;
  rate: number;
  value: string;
}) => {
  return (
    <div className="group relative bg-[#DCD3C9]">
      <div className="transaction absolute right-0 top-0 h-0 w-0 border-l-[16px] border-t-[16px] border-l-transparent border-t-primary duration-100 group-hover:opacity-0" />
      <div className="h-[325px] flex-1 overflow-hidden bg-white">
        {!!url ? (
          <LazyLoad once={true} placeholder={<Loader />}>
            <img
              src={url}
              alt="Image character"
              className="transaction ease-out-[cubic-bezier(0.215, 0.61, 0.355, 1)] h-[325px] w-full bg-white object-contain duration-300 group-hover:scale-95"
            />
          </LazyLoad>
        ) : (
          <div className="flex h-full items-center justify-center text-center">
            {t("comingSoon.title")}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 bg-[#DCD3C9] py-2 group-hover:bg-[#e6d9bf]">
        <span className="font-amatica text-2xl font-bold uppercase text-[#17191F]">
          {characterName}
        </span>
        <div className="flex">
          {Array.from({ length: rate }, (_, index) => (
            <StarBoldIcon key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
