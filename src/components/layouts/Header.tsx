"use client";
import { IconFaceBook } from "@/assets/icons/IconFacebook";
import { YoutubeIcon } from "@/assets/icons/YoutubeIcon";
import { useTheme } from "@/hooks/useTheme";
import { OptionsLanguage } from "@/utils/constants";
import { changeLanguage } from "i18next";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DropdownLanguage } from "../DropdownLanguage";
import { Logo } from "../core/Logo";
import { MenuBar } from "./MenuBar";
import { AppleIcon } from "@/assets/icons/AppleIcon";
import { GooglePlayIcon } from "@/assets/icons/GooglePlayIcon";
import { WindowIcon } from "@/assets/icons/WindowIcon";
import { APKIcon } from "@/assets/icons/APKIcon";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { MenuIcon } from "@/assets/icons/MenuIcon";

const Header = ({
  headerStyle,
  linkStyle = "text-[#fff] hover:after:border-[#dd9933]",
}: {
  headerStyle?: string;
  linkStyle?: string;
}) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { i18n } = useTranslation();
  return (
    <>
      <div className="fixed top-0 z-40 w-full">
        <nav
          className={`duration-250 ease-soft-in mx-auto flex items-center justify-between bg-[#222327] shadow-none transition-all xs:px-3 lg:px-14 ${headerStyle}`}
          navbar-scroll="true"
        >
          <Logo />
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              href={"/home"}
              className={` after:transition-border-color relative block whitespace-nowrap py-2 text-start text-[16px] tracking-wider ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${linkStyle} `}
            >
              {t("header.home")}
            </Link>
            <Link
              href={"/coming-soon"}
              className={` after:transition-border-color relative block whitespace-nowrap py-2 text-start text-[16px] tracking-wider ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${linkStyle} `}
            >
              {t("header.news")}
            </Link>
            <Link
              href={"/commercial-market"}
              className={` after:transition-border-color relative block whitespace-nowrap py-2 text-start text-[16px] tracking-wider ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${linkStyle} `}
            >
              {t("header.battlefield")}
            </Link>
            <Link
              href={"/coming-soon"}
              className={` after:transition-border-color relative block whitespace-nowrap py-2 text-start text-[16px] tracking-wider ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${linkStyle} `}
            >
              {t("header.contact")}
            </Link>
            <Link
              href={"/character"}
              className={` after:transition-border-color relative block whitespace-nowrap py-2 text-start text-[16px] tracking-wider ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${linkStyle} `}
            >
              {t("header.figure")}
            </Link>
          </div>
          <div className="hidden items-center gap-6 lg:flex">
            <Link href={"/coming-soon"}>
              <IconFaceBook />
            </Link>
            <Link href={"/coming-soon"}>
              <YoutubeIcon />
            </Link>
            <div className="flex w-[56px]  items-center">
              {/* <LanguageIcon color={isDarkTheme(theme) ? "#000000" : "#ffffff"} /> */}
              <div className="max-w-fit">
                <DropdownLanguage
                  defaultValue={{
                    label: `${i18n.language.toUpperCase()}`,
                    value: "language",
                  }}
                  className={`justify-end  px-0 ${linkStyle}`}
                  options={OptionsLanguage}
                  onChange={(value) => changeLanguage(value)}
                />
              </div>
            </div>
          </div>
          <div className="lg:hidden p-2" onClick={toggleMenu}>
          <MenuIcon color="#fff" />
        </div>
        </nav>
        <div className="relative h-full w-full md:w-[38%] lg:w-[28%] xl:w-auto">
          <div
            className={`max-w-auto fixed inset-y-0 left-0 top-0 z-50 w-full flex-wrap items-center justify-between overflow-y-auto border-0 bg-white p-0 px-2 shadow-none transition-all duration-300 dark:bg-black lg:hidden ${
              isMenuOpen
                ? "shadow-soft-xl translate-x-0"
                : "-translate-x-[-100%] md:-translate-x-[-200%]"
            } `}
          >
            <div className="mt-4 flex justify-between p-4">
              <div className="" onClick={toggleMenu}>
                <CloseIcon color="#111" />
              </div>
              <div className="flex items-center justify-between gap-4 ">
                <Link href={"/coming-soon"}>
                  <IconFaceBook isAnimate={false} />
                </Link>
                <Link href={"/coming-soon"}>
                  <YoutubeIcon isAnimate={false} />
                </Link>
                <div className="flex items-center">
                  <div className="max-w-fit">
                    <DropdownLanguage
                      colorIcon="#111"
                      defaultValue={{
                        label: `${i18n.language.toUpperCase()}`,
                        value: "language",
                      }}
                      className="justify-end  px-0 text-[#111]"
                      options={OptionsLanguage}
                      onChange={(value) => changeLanguage(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-4">
              <Link
                href={"/home"}
                className={`after:transition-border-color relative block whitespace-nowrap py-2 text-start text-sm text-[#111] ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:after:border-[#dd9933]`}
              >
                {t("header.home")}
              </Link>
              <Link
                href={"/coming-soon"}
                className={`after:transition-border-color relative block whitespace-nowrap py-2 text-start text-sm text-[#111] ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:after:border-[#dd9933]`}
              >
                {t("header.news")}
              </Link>
              <Link
                href={"/commercial-market"}
                className={`after:transition-border-color relative block whitespace-nowrap py-2 text-start text-sm text-[#111] ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:after:border-[#dd9933]`}
              >
                {t("header.battlefield")}
              </Link>
              <Link
                href={"/coming-soon"}
                className={`after:transition-border-color relative block whitespace-nowrap py-2 text-start text-sm text-[#111] ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:after:border-[#dd9933]`}
              >
                {t("header.contact")}
              </Link>
              <Link
                href={"/character"}
                className={`after:transition-border-color relative block whitespace-nowrap py-2 text-start text-sm text-[#111] ease-out  after:absolute after:bottom-[6px] after:left-0 after:block  after:w-full after:scale-x-0 after:border-t-2 after:border-[#1111] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:after:border-[#dd9933]`}
              >
                {t("header.figure")}
              </Link>
            </div>
            <div className="flex flex-col gap-2 px-4 py-2">
              <span className="text-start text-sm uppercase text-[#111]">{t("download")}</span>
              <div className="grid grid-cols-2 flex-wrap gap-4">
                <Link href={"/coming-soon"}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
