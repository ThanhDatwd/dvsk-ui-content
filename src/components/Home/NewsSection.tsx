import React, { useState } from "react";
import { TitleSection } from "./TitleSection";
import { NewsIcon } from "@/assets/icons/NewsIcon";
import { EllipseIcon } from "@/assets/icons/EllipseIcon";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { getStaticURL, tabContentList, tabs } from "@/utils/constants";

export const NewsSection = () => {
  const { t } = useTranslation();
  const [actived, setActived] = useState(tabs[0]);

  return (
    <div
      className="relative bg-cover xs:p-4 lg:px-14 lg:py-20 "
      style={{
        backgroundImage: `url('${getStaticURL()}/assets/images/banner-news.jpg')`,
        width: "100vw",
      }}
    >
      <div className="mx-auto flex max-w-[1504px] flex-col gap-8 lg:gap-16">
        <TitleSection title={t("homePage.news.title")} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Link
            href="/coming-soon"
            className="transaction aspect-video h-full w-full bg-white duration-300 ease-out hover:scale-[1.03]"
          >
            {" "}
          </Link>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex">
                  {tabs.map((item, index) => (
                    <div
                      onClick={() => setActived(item)}
                      key={index}
                      className={`cursor-pointer py-2 pr-4 font-semibold hover:text-[#BF0D0D] ${
                        actived === item ? "text-[#BF0D0D]" : ""
                      }`}
                    >
                      {t(`homePage.news.tab.${item}.title`)}
                    </div>
                  ))}
                </div>
                <Link href="/coming-soon">
                  <NewsIcon />
                </Link>
              </div>
              <div>
                {tabContentList.map(
                  (item, index) =>
                    item.tabName === actived &&
                    item.article.map((article, index) => (
                      <Link
                        key={index}
                        href="/coming-soon"
                        className="group flex justify-between border-b border-dashed border-[#17191F] py-2"
                      >
                        <div className="flex items-center gap-1 group-hover:text-[#BF0D0D]">
                          <EllipseIcon />
                          <span>
                            {article.hot && (
                              <span className="text-[#BF0D0D]">{`[HOT!]`}</span>
                            )}
                            &nbsp;
                            {t(`homePage.news.tab.news.${article.title}`)}
                          </span>
                        </div>
                        <span className="group-hover:text-[#BF0D0D]">
                          {article.date}
                        </span>
                      </Link>
                    )),
                )}
              </div>
              {/* <Link
              href="/coming-soon"
              className="group flex justify-between py-2 border-b border-dashed border-[#17191F]"
            >
              <div className="group-hover:text-[#BF0D0D]">
                <EllipseIcon />
                <span className="mx-1 text-[#BF0D0D]">{`[HOT!]`}</span>
                {t("homePage.news.tab.news.notiTwo")}
              </div>
              <span className="group-hover:text-[#BF0D0D]">25/03/2023</span>
            </Link>
            <Link
              href="/coming-soon"
              className="group flex justify-between py-2 border-b border-dashed border-[#17191F]"
            >
              <div className="group-hover:text-[#BF0D0D]">
                <EllipseIcon />
                <span className="ml-1">
                  {t("homePage.news.tab.news.notiThree")}
                </span>
              </div>
              <span className="group-hover:text-[#BF0D0D]">25/03/2023</span>
            </Link>
            <Link
              href="/coming-soon"
              className="group flex justify-between py-2 border-b border-dashed border-[#17191F]"
            >
              <div className="group-hover:text-[#BF0D0D]">
                <EllipseIcon />
                <span className="ml-1">
                  {t("homePage.news.tab.news.notiFour")}
                </span>
              </div>
              <span className="group-hover:text-[#BF0D0D]">25/03/2023</span>
            </Link>
            <Link
              href="/coming-soon"
              className="group flex justify-between py-2 border-b border-dashed border-[#17191F]"
            >
              <div className="group-hover:text-[#BF0D0D]">
                <EllipseIcon />
                <span className="ml-1">
                  {t("homePage.news.tab.news.notiFive")}
                </span>
              </div>
              <span className="group-hover:text-[#BF0D0D]">25/03/2023</span>
            </Link> */}
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Link
                href="/coming-soon"
                className="transaction aspect-video w-full bg-white duration-300 ease-out hover:scale-105 lg:aspect-video xl:h-full"
              ></Link>
              <Link
                href="/coming-soon"
                className="transaction aspect-video w-full bg-white duration-300 ease-out hover:scale-105 lg:aspect-video xl:h-full"
              ></Link>
              <Link
                href="/coming-soon"
                className="transaction aspect-video w-full bg-white duration-300 ease-out hover:scale-105 lg:aspect-video xl:h-full"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
