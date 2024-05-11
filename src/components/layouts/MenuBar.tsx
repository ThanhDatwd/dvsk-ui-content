import { DirectIcon } from "@/assets/icons/DirectIcon";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrailerModal } from "../TrailerModal";
import TooltipText from "../core/TooltipText";

const LinkMenu = [
  {
    name: "joinDiscord",
    link: "/coming-soon",
  },
  {
    name: "viewOnOpensea",
    link: "/coming-soon",
  },
  {
    name: "followUsOnTwitter",
    link: "/coming-soon",
  },
  {
    name: "drops",
    link: "/coming-soon",
  },
];

export const MenuBar = ({ onClose }: { onClose: any }) => {
  const [openTrailer, setOpenTrailer] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="fixed z-[999] h-screen w-[100vw] overflow-auto bg-[#00000099] xs:p-0 lg:p-[50px] ">
        <div className="relative min-h-full w-full overflow-hidden bg-[#d7d7d7] pt-[60px] xs:rounded-none xs:px-[20px] xs:py-5 lg:rounded-[35px] lg:p-20">
          <div className="flex flex-col gap-20">
            <div className="flex items-center justify-between">
              <div className="text-[22px] font-bold">ĐẠI VIỆT SỬ KÝ</div>
              <div
                className="group flex cursor-custom items-center"
                onClick={onClose}
              >
                <div
                  style={{ animationDelay: "750ms" }}
                  className="animated-slide-out animate-active text-right text-[12px] font-bold"
                >
                  {t("3dPage.closeMenu")}
                </div>
                <div
                  style={{ animationDelay: "500ms" }}
                  className="animated-scale-out animate-active"
                >
                  <div className="ml-[10px] flex  h-[32px] w-[32px] rotate-0 items-center justify-center rounded-[50%]  bg-[#000] fill-[#fff] duration-300 ease-linear group-hover:rotate-90 group-hover:bg-[#fff] group-hover:fill-[#000] ">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path d="m13.205 4.205-1.41-1.41-3.79 3.79-3.8-3.79-1.41 1.41 3.79 3.8-3.79 3.79 1.41 1.41 3.8-3.79 3.79 3.79 1.41-1.41-3.79-3.79 3.79-3.8Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-12 items-end">
                <ul className="xs:col-span-12 lg:col-span-8">
                  <li className="relative overflow-hidden  ">
                    <Link
                      href={"/home"}
                      className="animated-show-from-b flex cursor-custom  items-start gap-3 text-[#000] delay-100"
                    >
                      <span className="font-bold leading-tight duration-300 ease-linear hover:text-[#fff] xs:text-[36px] lg:text-[58px]">
                        {t("3dPage.home")}
                      </span>
                      <small className="mt-4 text-[9px] text-[#00000080]">
                        01 /
                      </small>
                    </Link>
                  </li>
                  <li className="relative overflow-hidden  ">
                    <Link
                      href={"/coming-soon"}
                      style={{ animationDelay: "150ms" }}
                      className="animated-show-from-b flex cursor-custom   items-start gap-3 text-[#000] delay-[5000ms]"
                    >
                      <span className="font-bold leading-tight duration-300 ease-linear hover:text-[#fff] xs:text-[36px] lg:text-[58px]">
                        {t("3dPage.news")}
                      </span>
                      <small className="mt-4 text-[9px] text-[#00000080]">
                        02 /
                      </small>
                    </Link>
                  </li>
                  <li className="relative overflow-hidden  ">
                    <Link
                      href={"/coming-soon"}
                      style={{ animationDelay: "250ms" }}
                      className="animated-show-from-b flex cursor-custom   items-start gap-3 text-[#000] delay-[7000ms]"
                    >
                      <span className="font-bold leading-tight duration-300 ease-linear hover:text-[#fff] xs:text-[36px] lg:text-[58px]">
                        {t("3dPage.contact")}
                      </span>
                      <small className="mt-4 text-[9px] text-[#00000080]">
                        03 /
                      </small>
                    </Link>
                  </li>
                  <li className="relative overflow-hidden  ">
                    <Link
                      href={"/character"}
                      style={{ animationDelay: "350ms" }}
                      className="animated-show-from-b flex cursor-custom items-start gap-3 text-[#000] delay-[8000ms]"
                    >
                      <span className="font-bold leading-tight duration-300 ease-linear hover:text-[#fff] xs:text-[36px] lg:text-[58px]">
                        {t("3dPage.characters")}
                      </span>
                      <small className="mt-4 text-[9px] text-[#00000080]">
                        <DirectIcon color="#00000080" />
                      </small>
                    </Link>
                  </li>
                </ul>
                <ul className="mb-2 flex flex-col xs:col-span-12 lg:col-span-4">
                  {LinkMenu.map((item, index) => {
                    return (
                      <TooltipText
                        key={index}
                        className="right-1/3 top-1/2 translate-x-1/2 "
                      >
                        <li className="overflow-hidden xs:mt-0 xs:py-[10px] lg:mt-[30px] lg:py-0 ">
                          <div className="animated-show-from-b flex cursor-custom items-end justify-between text-[#00000080] hover:text-[#000]">
                            <span className="text-[12px] font-bold  duration-300 ease-linear">
                              {t("3dPage." + item.name)}
                            </span>
                            <DirectIcon />
                          </div>
                        </li>
                      </TooltipText>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-[50px] flex items-center border-t-2  border-t-[#000] pt-[30px] xs:flex-col xs:justify-center lg:flex-row lg:justify-between">
                <div className="flex xs:justify-center lg:justify-start">
                  <button
                    onClick={() => {
                      setOpenTrailer(true);
                    }}
                    className={` animated-scale-out animate-active group flex items-center rounded-[26px]  bg-[#ffffff4d] p-[10px]`}
                  >
                    <div
                      style={{ animationDelay: "500ms" }}
                      className={`animated-slide-out animate-active flex items-center gap-[10xp] `}
                    >
                      <span
                        style={{ animationDelay: "500ms" }}
                        className={`animated-slide-out animate-active text-[12px] font-bold  `}
                      >
                        {t("3dPage.playTrailer")}
                      </span>
                    </div>
                    <div
                      className={` flex h-[32px] w-[32px] items-center justify-center rounded-[50%]  bg-[#000] fill-[#fff] duration-300 ease-linear group-hover:bg-[#fff] group-hover:fill-[#000] `}
                    >
                      <svg viewBox="0 0 16 16" width="16" height="16">
                        <path d="M3.765 2.35v11.3L12.235 8l-8.47-5.65Z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div className=" w-full border-b-[#000]  pb-[30px] xs:mb-[24px] xs:border-b lg:hidden"></div>
                <div className="flex items-center xs:flex-col xs:gap-0 lg:flex-row lg:gap-6">
                  <TooltipText className="-top-10 right-1/2 translate-x-1/2 ">
                    <div className="cursor-custom py-[10px] text-[10px] font-bold text-[#000] hover:text-[#fff]">
                      {t("3dPage.termsAndConditions")}
                    </div>
                  </TooltipText>
                  <TooltipText className="-top-10 right-1/2 translate-x-1/2 ">
                    <div className="cursor-custom py-[10px] text-[10px] font-bold text-[#000]  hover:text-[#fff]">
                      {t("3dPage.privacyPolicy")}
                    </div>
                  </TooltipText>
                </div>
              </div>
              <div className="h-[60px]"></div>
            </div>
          </div>
          {/* TEXT RUNNING */}
          <div className="absolute bottom-0 left-0   flex translate-y-[50%] items-center">
            <div className="scroll-text whitespace-nowrap text-center font-bold text-[#00000080] xs:text-[100px]  lg:text-[200px] ">
              <span className="mr-[70vw]">ĐẠI VIỆT SỬ KÝ</span>
              <span className="mr-[70vw]">ĐẠI VIỆT SỬ KÝ</span>
              <span className="mr-[70vw]">ĐẠI VIỆT SỬ KÝ</span>
              <span className="mr-[70vw]">ĐẠI VIỆT SỬ KÝ</span>
              <span className="">ĐẠI VIỆT SỬ KÝ</span>
            </div>
          </div>
        </div>
      </div>
      {openTrailer && <TrailerModal onClose={() => setOpenTrailer(false)} />}
    </>
  );
};
