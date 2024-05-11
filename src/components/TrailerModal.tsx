import { getStaticURL } from "@/utils/constants";
import React from "react";
import LazyLoad from "react-lazyload";
import Loader from "./common/Loader";

export const TrailerModal = ({
  onClose,
  src,
}: {
  onClose: VoidFunction;
  src?: string;
}) => {
  return (
    <div className="fixed z-[9999] flex h-screen w-[100vw] items-center justify-center overflow-hidden bg-[#000] xs:p-0 lg:p-[80px] ">
      <LazyLoad className=" w-full " once={true} placeholder={<Loader />}>
        <video
          className=" relative z-10 w-full"
          controls={true}
          autoPlay
          muted
          loop
          src={src || `${getStaticURL()}/assets/videos/trailer.mp4`}
        />
      </LazyLoad>
      <button
        style={{ animationDelay: "4500ms" }}
        onClick={onClose}
        className={` animated-scale-out animate-active group absolute right-[30px] top-[30px] z-20 flex items-center rounded-[26px]  bg-[#ffffff4d] p-[10px]`}
      >
        <div
          style={{ animationDelay: "5000ms" }}
          className={`animated-slide-out animate-active items-center gap-[10xp] xs:hidden lg:flex  `}
        >
          <span
            style={{ animationDelay: "5000ms" }}
            className={`animated-slide-out animate-active text-[12px] font-bold  `}
          >
            EXIT TRAILER
          </span>
        </div>
        <div
          className={` flex h-[32px] w-[32px] items-center justify-center rounded-[50%]  bg-[#000] fill-[#fff] duration-300 ease-linear group-hover:bg-[#fff] group-hover:fill-[#000] `}
        >
          <svg viewBox="0 0 16 16" width="16" height="16">
            <path d="m13.205 4.205-1.41-1.41-3.79 3.79-3.8-3.79-1.41 1.41 3.79 3.8-3.79 3.79 1.41 1.41 3.8-3.79 3.79 3.79 1.41-1.41-3.79-3.79 3.79-3.8Z"></path>
          </svg>
        </div>
      </button>
    </div>
  );
};
