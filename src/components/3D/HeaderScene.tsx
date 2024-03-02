"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import TooltipText from "../core/TooltipText";

export default function HeaderScene({
  openTrailer,
  setOpenTrailer,
}: {
  openTrailer?: boolean;
  setOpenTrailer?: (value: boolean) => void;
}) {
  const { t } = useTranslation();
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
        return;
      }
      setIsScroll(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="absolute left-0 top-0 z-[-100] h-[500vh] w-full">
        <div className="w-full cursor-custom  ">
          <div className=" left-0 top-0 z-0 w-full  items-center justify-between px-5  py-5 xs:flex md:hidden ">
            <div className="flex h-[52px] flex-1 items-center justify-start   ">
              <span className="text-[16px] font-bold  ">ĐẠI VIỆT SỬ KÝ</span>
            </div>
          </div>
          <div className="left-0 top-0 z-0 w-full  items-center justify-between px-14  pt-14 xs:hidden lg:flex">
            <div className="flex-1 ">
              <button
                onClick={() => {
                  setOpenTrailer && setOpenTrailer(true);
                }}
                className={` animated-scale-out ${
                  !isScroll && "animate-active"
                } group flex cursor-custom items-center rounded-[26px] bg-[#ffffff4d] p-[10px]`}
              >
                <div
                  style={{ animationDelay: "500ms" }}
                  className={`animated-slide-out ${
                    !isScroll && "animate-active"
                  } flex items-center gap-[10xp]  `}
                >
                  <span
                    style={{ animationDelay: "500ms" }}
                    className={`animated-slide-out text-[12px] font-bold ${
                      !isScroll && "animate-active"
                    } `}
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
            <div className=" flex flex-1  justify-start">
              <span className="text-[16px] font-bold ">
                {t("3dPage.title")}
              </span>
            </div>
            <TooltipText className="-bottom-14 right-2/3 translate-x-1/2">
              <div className="flex flex-1 cursor-custom items-center justify-end gap-6 pr-[72px]  text-[#000]">
                <button
                  onClick={() => {}}
                  className={` animated-scale-out ${
                    !isScroll && "animate-active"
                  } group  flex items-center rounded-[26px]   bg-[#ffffff4d] p-[10px] `}
                >
                  <div
                    style={{ animationDelay: "500ms" }}
                    className={`animated-slide-out ${
                      !isScroll && "animate-active"
                    } flex items-center gap-[10xp] `}
                  >
                    <span
                      style={{ animationDelay: "500ms" }}
                      className={`animated-slide-out text-[12px] font-bold ${
                        !isScroll && "animate-active"
                      } `}
                    >
                      {t("3dPage.viewOnOpensea")}
                    </span>
                    <span className="w-[10px]"></span>
                  </div>
                  <div
                    className={` flex h-[32px] w-[32px] items-center justify-center rounded-[50%]   bg-[#000] fill-[#fff] duration-300 ease-linear group-hover:bg-[#fff] group-hover:fill-[#000] `}
                  >
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path d="M16 10.662v-.784c0-.06-.046-.09-.08-.114l-.028-.02-3.703 1.08c-.027 0-.027 0-.054.027a12.2 12.2 0 0 1-.727.709c-.052.047-.09.082-.11.102-.217.19-.514.297-.812.297h-1.35v-1.378h1.08c.027 0 .054 0 .081-.027l.135-.135c.054-.027.136-.108.217-.19l.162-.161.162-.163c.081-.08.162-.162.243-.27.027-.04.054-.074.081-.108.027-.034.054-.068.081-.108a1.5 1.5 0 0 0 .162-.216c.028-.027.048-.061.068-.095.02-.034.04-.067.068-.095.013-.027.034-.06.054-.094.02-.034.04-.068.054-.095.081-.122.148-.26.21-.39l.06-.123c.054-.108.081-.19.108-.27.027-.109.054-.19.081-.27l.005-.037c.025-.201.048-.381.022-.585 0-.054 0-.136-.027-.19 0-.054 0-.08-.027-.135A5.243 5.243 0 0 0 12 6.23a.536.536 0 0 0-.054-.108c-.02-.034-.04-.068-.054-.109a5.76 5.76 0 0 1-.065-.112 2.448 2.448 0 0 0-.205-.32c-.014-.027-.034-.054-.054-.081-.02-.027-.041-.054-.054-.081l-.244-.324a1.497 1.497 0 0 0-.094-.122 1.475 1.475 0 0 1-.095-.122 1.538 1.538 0 0 1-.19-.216 8.603 8.603 0 0 0-.702-.703.266.266 0 0 1-.067-.054.264.264 0 0 0-.068-.054 3.932 3.932 0 0 1-.31-.25 4.66 4.66 0 0 0-.15-.128c-.053-.054-.108-.108-.162-.135a2.662 2.662 0 0 0-.08-.052.485.485 0 0 1-.082-.056c0-.027-.027-.027-.027-.027l-.135-.027v-1.19a.651.651 0 0 0-.19-.486.677.677 0 0 0-.486-.216c-.378 0-.675.324-.675.702v.784l-.081-.027-.19-.054-.189-.054-1.324-.351c-.054 0-.108.054-.081.108l.135.46.081.161c.014.041.034.075.054.109.02.033.04.067.054.108a.436.436 0 0 1 .108.189c.03.073.067.154.108.243l.109.243c.032.066.055.131.08.203.016.046.033.095.055.149.108.297.216.621.324.973l.081.324.027.054c.054.162.081.324.108.487.027.108.054.216.054.324 0 .054.007.115.014.176.007.06.013.121.013.175.027.108.027.216.027.325 0 .27-.027.54-.08.783a.835.835 0 0 1-.055.217.423.423 0 0 1-.04.148c-.014.038-.03.077-.04.122a.384.384 0 0 1-.055.162c-.108.297-.27.595-.432.865a10.4 10.4 0 0 1-.56.908L6 10.365c-.014.013-.02.027-.027.04a.141.141 0 0 1-.027.04c-.054.055 0 .163.081.163h1.73v1.378H6c-.46 0-.892-.27-1.108-.702a1.174 1.174 0 0 1-.135-.676c0-.081-.027-.135-.108-.135h-3.54a.116.116 0 0 0-.109.108v.081c0 2.243 1.81 4.081 4.054 4.081h6.378c1.185 0 1.857-1.076 2.52-2.14.184-.296.368-.59.562-.86.35-.486 1.189-.865 1.432-.973.027-.027.054-.054.054-.108ZM1.946 8.878l-.054.081c-.054.082 0 .163.135.163H5.27c.027 0 .054-.027.081-.054.01-.02.024-.04.039-.062.025-.036.053-.077.07-.128.27-.46.54-.973.621-1.351.19-.919-.243-2.378-.784-3.568-.027-.08-.135-.108-.189-.027L1.946 8.878Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </TooltipText>
          </div>
        </div>
      </div>
    </>
  );
}
