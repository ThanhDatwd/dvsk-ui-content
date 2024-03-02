import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { getStaticURL } from "@/utils/constants";
import { useOnboard } from "@/hooks/useOnboard";

export const OnBoarding = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [opacityText, setOpacityText] = useState("opacity-100");
  const [scaleText, setScaleText] = useState("opacity-0");
  const [opacityImage, setOpacityImage] = useState("opacity-0");
  const { setIsLoadingBoardingDone } = useOnboard();

  const componentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const percentageCount = setTimeout(() => {
      if (progressValue < 100) {
        if (progressValue == 1) {
          setScaleText("scale-[4] opacity-100");
        }
        if (progressValue == 50) {
          setOpacityText("opacity-0");
        }
        if (progressValue == 56) {
          setOpacityImage("opacity-100");
        }
        setProgressValue((prev) => prev + 1);
      } else {
        const ref = componentRef.current!;
        if (ref) {
          ref.style.transform = "translateY(-100%)";
          ref.style.transitionDuration = "0.7s";
        }
        setIsLoadingBoardingDone(true);
      }
    }, 50);

    return () => clearTimeout(percentageCount);
  }, [progressValue]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={componentRef}
      className={`absolute z-[9999] flex h-screen w-screen flex-col items-center justify-end bg-[#d7d7d7] ease-in-out`}
    >
      <div
        ref={textRef}
        className={`absolute top-1/2 font-bold uppercase text-[#6b0e01] xs:text-[10px] md:text-3xl ${opacityText} ${scaleText} transition duration-[700ms] ease-in-out`}
      >
        đại việt sử ký
      </div>
      <div
        className={`animate-logo absolute top-1/2 -translate-y-1/2 ${opacityImage} transition delay-300 duration-75 ease-in-out`}
      >
        <Image
          className="xs:h-32 xs:w-32 md:h-[400px] md:w-[400px]"
          src={`${getStaticURL()}/assets/images/logo.png`}
          alt="logo"
          width={400}
          height={400}
        />
      </div>
      <div className="absolute bottom-16 flex flex-col items-center gap-6">
        <div
          style={{ background: `conic-gradient(#6b0e01 ${progressValue * 3.6}deg, #ededed 0deg)` }}
          className="relative flex h-[58px] w-[58px] items-center justify-center gap-4 rounded-full text-center before:absolute before:block before:h-[50px] before:w-[50px] before:rounded-full before:bg-[#d7d7d7]"
        >
          <span className="z-10 font-bold text-[#6b0e01] xs:text-xs md:text-sm">
            {progressValue}%
          </span>
        </div>
        <div className="animate reflect text-center">
          <span className="text-[#979797]">Đang</span>&nbsp;
          <span className="text-[#979797]">tải</span>&nbsp;
          <span className="text-[#979797]">...</span>&nbsp;
        </div>
      </div>
    </div>
  );
};
