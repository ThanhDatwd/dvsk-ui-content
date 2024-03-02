"use client";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  offset?: number;
}
export const SceneText = (props: IProps) => {
  const { t } = useTranslation();
  const { offset = 0 } = props;
  return (
    <div className={`relative left-0  -z-40 h-[100vh] w-[100vw]`}>
      <div className="absolute right-[0px] top-[50%] z-[-100] h-fit w-[500px] max-w-[100vw] translate-y-[-50%] duration-500 ease-linear xs:px-5 xs:pr-5 lg:pr-[100px]">
        <div
          style={{
            opacity: `${
              offset >= 0.3 ? 1 - (offset < 0.3 ? 0 : offset - 0.3) * 6 : 1
            }`,
          }}
          className="w-full "
        >
          <div className="flex w-fit flex-col  gap-4 ">
            <small
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "0 100%",
                visibility: "inherit",
                transform: `rotate3d(1, .15, 0, ${
                  (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90 >= 0
                    ? 0
                    : (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90
                }deg) translate3d(0, 10px, 0)`,
              }}
              className=" text-[12px] text-[#00000080]  xs:text-right lg:text-left"
            >
              01 /
            </small>
            <div className="mt-4 flex flex-col">
              <span
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "0 100%",
                  visibility: "inherit",
                  transform: `rotate3d(1, .15, 0, ${
                    (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90 >= 0
                      ? 0
                      : (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90
                  }deg) translate3d(0, 10px, 0)`,
                }}
                className={`text-[40px] font-extrabold  leading-none xs:text-right lg:text-left `}
              >
                {t("3dPage.sceneText.text1.title1")}
              </span>
              <span
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "0 100%",
                  visibility: "inherit",
                  transform: `rotate3d(1, .15, 0, ${
                    (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90 >= 0
                      ? 0
                      : (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90
                  }deg) translate3d(0, 10px, 0)`,
                }}
                className={`  text-[40px] font-extrabold   xs:text-right lg:text-left`}
              >
                {t("3dPage.sceneText.text1.title2")}
              </span>
            </div>
            <span
              className="xs:text-right lg:text-left"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "0 100%",
                visibility: "inherit",
                transform: `rotate3d(1, .15, 0, ${
                  (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90 >= 0
                    ? 0
                    : (1 - (offset < 0.2 ? 0 : offset - 0.2) * 12) * -90
                }deg) translate3d(0, 10px, 0)`,
              }}
            >
              {t("3dPage.sceneText.text1.content")}
            </span>
          </div>
        </div>
      </div>
      {/* SIDE LEFT */}
      <div className="absolute left-[0px] top-[50%] z-[-100] h-fit w-[500px] max-w-[100vw] translate-y-[-50%] duration-500 ease-linear xs:px-5 xs:pl-5 lg:pl-[100px] ">
        <div
          style={{
            opacity: `${
              offset >= 0.8 ? 1 - (offset < 0.8 ? 0 : offset - 0.8) * 6 : 1
            }`,
          }}
          className="w-full "
        >
          <div className="flex w-fit flex-col  gap-4 ">
            <small
              style={{
                opacity: `${
                  (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90 >= 1
                    ? 1
                    : (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90
                }`,
              }}
              className=" text-[12px] text-[#00000080]"
            >
              2 /
            </small>
            <div className="mt-4 flex flex-col">
              <span
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "0 100%",
                  visibility: "inherit",
                  transform: `rotate3d(1, .15, 0, ${
                    (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90 >= 0
                      ? 0
                      : (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90
                  }deg) translate3d(0, 10px, 0)`,
                }}
                className={`text-[40px] font-extrabold  uppercase leading-none`}
              >
                {t("3dPage.sceneText.text2.title1")}
              </span>
              <span
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "0 100%",
                  visibility: "inherit",
                  transform: `rotate3d(1, .15, 0, ${
                    (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90 >= 0
                      ? 0
                      : (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90
                  }deg) translate3d(0, 10px, 0)`,
                }}
                className={`  text-[40px] font-extrabold uppercase`}
              >
                {t("3dPage.sceneText.text2.title2")}
              </span>
            </div>
            <span
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "0 100%",
                visibility: "inherit",
                transform: `rotate3d(1, .15, 0, ${
                  (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90 >= 0
                    ? 0
                    : (1 - (offset < 0.7 ? 0 : offset - 0.7) * 12) * -90
                }deg) translate3d(0, 10px, 0)`,
              }}
            >
              {t("3dPage.sceneText.text2.content")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
