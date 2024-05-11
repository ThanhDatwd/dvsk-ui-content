"use client";
import { OnBoarding } from "@/components/OnBoarding";
import { MenuBar } from "@/components/layouts/MenuBar";
import { useCallback, useEffect, useRef, useState } from "react";

import { SpeakerIcon } from "@/assets/icons/SpeakerIcon";
import { DropdownLanguage } from "@/components/DropdownLanguage";
import LazyLoaded3DAnimation from "@/components/LazyRenderAnimation";
import TooltipText from "@/components/core/TooltipText";
import { OnboardProvider } from "@/providers/OnboardProvider";
import { OptionsLanguage, getStaticURL } from "@/utils/constants";
import { changeLanguage } from "i18next";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { useOnboard } from "@/hooks/useOnboard";
import "../styles/first-page.css";

export default function Home() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isScroll, setIsScroll] = useState(false);
  const boxRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const [isPlayed, setIsPlayed] = useState(false);
  const { isLoadingBoardingDone } = useOnboard();
  const [isPlaying, setIsPlaying] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (event: any) => {
      if (boxRef?.current) {
        const boxWidth = boxRef?.current?.clientWidth;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const distance = 20;
        const boxX = mouseX - boxWidth / 2;
        const boxY = mouseY - distance;
        boxRef.current.style.transform = `translate(${boxX}px, ${boxY}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleBodyClick = useCallback(
    (event: any) => {
      if (event.target !== audioRef.current && !isPlayed) {
        setIsPlayed(true);
        !isPlayed && audioRef.current.play();
        !isPlayed && setIsPlaying(true);
      }
    },
    [isPlayed],
  );

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden">
      <OnBoarding />
      <div
        style={{
          opacity: isPlayed ? "0" : "1",
        }}
        className=" fixed bottom-20 left-1/2 z-[9998] flex -translate-x-1/2 items-center gap-2 rounded-[26px] bg-[#ffffff4d] p-[10px] text-[12px] md:bottom-full md:left-0 "
        ref={boxRef}
        id="mouse-box"
      >
        {" "}
        <SpeakerIcon />{" "}
        <span id="text-click" className="whitespace-nowrap">
          {t("3dPage.clickAnywhereToEnableSound")}
        </span>
      </div>
      <div className="relative">
        <LazyLoaded3DAnimation />
        <div
          onClick={() => {
            toggleMenu();
            if (audioRef.current) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          }}
          style={{ animationDelay: "500ms" }}
          className={`animated-scale-out animate-active fixed z-50 ml-[10px]  flex h-[52px] w-[52px] rotate-0  cursor-custom items-center  justify-center rounded-[50%] bg-[#fff] fill-[#000] duration-300 ease-linear  hover:bg-[#000] hover:fill-[#fff] group-hover:rotate-90 xs:right-5 xs:top-5 lg:right-14 lg:top-14 `}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z" />
          </svg>
        </div>
        <div
          className={`${
            isMenuOpen ? "" : "hidden"
          } fixed left-0 top-0 z-[999] duration-300 ease-linear`}
        >
          <MenuBar onClose={() => toggleMenu()} />
        </div>
      </div>
      {isLoadingBoardingDone && (
        <div className="pointer-events-none fixed bottom-0 z-[100]  w-full xs:px-5 xs:py-4 lg:px-14 lg:py-8">
          <div className="flex justify-between">
            <div className="flex flex-1 items-center gap-4 ">
              <TooltipText>
                <button
                  onClick={() => {}}
                  className={` animated-scale-out ${
                    !isScroll && "animate-active"
                  } group pointer-events-auto flex cursor-custom items-center rounded-[26px] bg-[#ffffff4d] xs:p-0 lg:p-[10px]`}
                >
                  <div
                    style={{ animationDelay: "500ms" }}
                    className={`animated-slide-out ${
                      !isScroll && "animate-active"
                    } items-center gap-[10xp]  xs:hidden lg:flex `}
                  >
                    <span
                      style={{ animationDelay: "500ms" }}
                      className={`animated-slide-out text-[12px] font-bold ${
                        !isScroll && "animate-active"
                      } `}
                    >
                      {t("3dPage.ourRoadMap")}
                    </span>
                  </div>
                  <div
                    className={` flex items-center justify-center rounded-[50%] bg-[#000] fill-[#fff] duration-300 ease-linear  group-hover:bg-[#fff] group-hover:fill-[#000] xs:h-[40px] xs:w-[40px] lg:h-[32px] lg:w-[32px] `}
                  >
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path d="M5.674 4.68h3.903c.21.633.64 1.171 1.212 1.518a2.833 2.833 0 0 0 3.612-.576 2.794 2.794 0 0 0 0-3.637 2.833 2.833 0 0 0-3.612-.576 2.806 2.806 0 0 0-1.212 1.518H5.71a2.75 2.75 0 0 0-1.885.701 2.925 2.925 0 0 0-.881 2.217 2.868 2.868 0 0 0 .88 2.243 2.378 2.378 0 0 0 1.701.604h4.732c.299.074.566.241.761.478.196.237.309.53.322.836-.019.311-.14.608-.343.845a1.446 1.446 0 0 1-.784.47h-3.64a2.806 2.806 0 0 0-1.211-1.519 2.833 2.833 0 0 0-3.612.576 2.794 2.794 0 0 0 0 3.637 2.833 2.833 0 0 0 3.612.576 2.807 2.807 0 0 0 1.212-1.518h3.956a3.228 3.228 0 0 0 1.83-1.075c.47-.554.739-1.25.76-1.974a3.187 3.187 0 0 0-.737-1.962 3.22 3.22 0 0 0-1.8-1.087H5.498a.672.672 0 0 1-.458-.158c-.201-.27-.295-.603-.265-.937-.03-.34.07-.678.282-.946a.946.946 0 0 1 .617-.254Zm6.564-1.928a1.061 1.061 0 0 1 .977.65 1.046 1.046 0 0 1-.23 1.145 1.06 1.06 0 0 1-1.804-.743c0-.28.111-.547.31-.744a1.06 1.06 0 0 1 .747-.308ZM3.912 13.265a1.061 1.061 0 0 1-.977-.649 1.046 1.046 0 0 1 .23-1.145 1.06 1.06 0 0 1 1.804.743c0 .279-.111.546-.31.743a1.06 1.06 0 0 1-.747.308Z"></path>
                    </svg>
                  </div>
                </button>
              </TooltipText>

              {/* ngôn ngữ */}

              <button
                onClick={() => {}}
                className={` animated-scale-out ${
                  !isScroll && "animate-active"
                } group pointer-events-auto flex cursor-custom items-center rounded-[26px] bg-[#ffffff4d] xs:p-0 lg:p-[10px] `}
              >
                <div
                  className={` flex items-center justify-center rounded-[50%] bg-[#000] fill-[#fff] duration-300  ease-linear xs:h-[40px] xs:w-[40px] lg:h-[32px] lg:w-[32px] `}
                >
                  {/* <svg viewBox="0 0 26 26" width="16" height="16">
                  <path d="M13.727 7h5.765c0-.4-.639-6-5.995-6h-.919C7.183 1 6.583 6.6 6.583 7h7.144Zm10.341 1.66A2.826 2.826 0 0 0 21.99 8h-1.159c.16.81.5 3.55-1.868 4.4-3.507 1.26-4.916-2.51-4.916-2.51a1 1 0 0 0-.48-.63h-1.099a1.15 1.15 0 0 0-.51.61s-1.408 3.74-4.955 2.48c-2.178-.8-1.998-3.26-1.858-4.23L5.005 8h-1a2.835 2.835 0 0 0-2.068.71 4.002 4.002 0 0 0-.929 2.83 3.682 3.682 0 0 0 1.899 3.35c.01 0 .045.013.1.034.435.16 2.13.79 3.237-.584l.06-.06.59-.4v1.98c.336-.565.75-1.08 1.228-1.53a.6.6 0 0 1-.2-.33c0-.61.5-1 1.569-1a2.626 2.626 0 0 1 2.138.75v.13a1.459 1.459 0 0 0 1.22.56 1.717 1.717 0 0 0 1.338-.6c.033-.052.07-.102.11-.15a2.617 2.617 0 0 1 2.258-.69c1.069 0 1.559.42 1.559 1a.69.69 0 0 1-.14.37c.48.462.89.99 1.219 1.57v-1.39h.31l.29-.12.149.14a2.997 2.997 0 0 0 3.137.34 3.658 3.658 0 0 0 1.909-3.37 4.002 4.002 0 0 0-.92-2.88Zm-4.546 9.86v.11c.04.28.07.54.08.79a4.184 4.184 0 0 1-1.069 3.69C17.434 24.27 15.466 25 12.998 25s-4.476-.87-5.475-1.94c-1-1.07-1.3-2.15-1-4.44v-.11a6.822 6.822 0 0 1 1.61-3.37c.189-.21.349-.37.449-.47a2.884 2.884 0 0 0 2.687-.5 1.998 1.998 0 0 0 1.729.83 2.296 2.296 0 0 0 1.838-.8 2.886 2.886 0 0 0 2.678.52c.169.162.329.332.48.51a7.003 7.003 0 0 1 1.528 3.29Zm-6.524 2.8a15.973 15.973 0 0 1 4.996.78l.15-.58a16.512 16.512 0 0 0-5.266-.82 14.816 14.816 0 0 0-5.106.82l.23.58a14.227 14.227 0 0 1 4.996-.78Z"></path>
                </svg> */}
                  <div className="mb-[2px] max-w-fit">
                    <DropdownLanguage
                      position="right-[50%] translate-x-[50%] bottom-[100%] origin-bottom-center"
                      defaultValue={{
                        label: ``,
                        value: "language",
                      }}
                      className={`mt-0  justify-end px-0 text-[#fff]`}
                      options={OptionsLanguage}
                      onChange={(value) => changeLanguage(value)}
                    />
                  </div>
                </div>
              </button>
              <div
                className="soundbar visible lg:hidden group pointer-events-auto h-[20px] "
                onClick={() => {
                  if (!isPlaying) {
                    audioRef.current.play();
                    setIsPlaying(true);
                  } else {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
              >
                <audio
                  ref={audioRef}
                  loop
                  src={`${getStaticURL()}/assets/videos/trailer.mp4`}
                />
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
              </div>
            </div>
            <div className="flex-1  ">
              <div className="flex w-full items-center gap-4 xs:justify-end lg:justify-center">
                <span className=" pointer-events-auto text-[12px] font-bold text-[#fff] xs:hidden lg:block">
                  {t("3dPage.press")}
                </span>
                <TooltipText>
                  <div className="pointer-events-auto relative mt-[8px] w-fit ">
                    <div className="absolute  left-0 top-[-6px] flex h-[44px]  w-[160px] items-center  justify-center rounded-[22px] border-2 border-[#ffffff33] bg-black px-6 text-[14px] font-bold text-[#fff] duration-100 ease-in-out hover:top-[-4px] ">
                      {t("3dPage.character")}
                    </div>
                    <div className=" left-0 top-0  flex  h-[44px] w-[160px] items-center justify-center rounded-[22px] border-2 border-[#ffffff33] bg-black px-6 text-[14px] font-bold text-[#fff]  "></div>
                  </div>
                </TooltipText>
                <span className=" pointer-events-auto text-[12px] font-bold text-[#fff] xs:hidden lg:block">
                  {t("3dPage.toSwitch")}
                </span>
              </div>
            </div>
            <div className="flex-1 items-center justify-between xs:hidden lg:flex ">
              <Link
                href={"/coming-soon"}
                className=" flex cursor-custom items-end justify-between text-[#000] hover:text-[#fff] "
              >
                <span className=" pointer-events-auto text-[12px] font-bold  duration-300 ease-linear">
                  TRẦN KHÁNH DƯ
                </span>
              </Link>
              <div
                className="soundbar group pointer-events-auto h-[20px] "
                onClick={() => {
                  if (!isPlaying) {
                    audioRef.current.play();
                    setIsPlaying(true);
                  } else {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
              >
                <audio
                  ref={audioRef}
                  loop
                  src={`${getStaticURL()}/assets/videos/trailer.mp4`}
                />
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
                <div
                  className={`bar ${
                    isPlaying ? "animate-active" : ""
                  } bg-black group-hover:bg-white`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
