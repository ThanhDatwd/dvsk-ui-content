"use client";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import Image from "next/image";
import { getStaticURL } from "@/utils/constants";
import { FooterData } from "@/utils/constants";
import Link from "next/link";
import { YoutubeIcon } from "@/assets/icons/YoutubeIcon";
import { IconFaceBook } from "@/assets/icons/IconFacebook";

export const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <div className="bg-secondary">
      <div
        className={`xs:item-start mmd:items-center z-10 mx-auto max-w-[1504px] xs:flex xs:flex-col xs:px-4 xs:py-8 md:flex-row md:px-14 md:py-20 `}
      >
        <Link href="/">
          <Image
            src={`${getStaticURL()}/assets/images/logo.png`}
            width={89}
            height={86}
            className="w-22 h-20"
            alt="Logo"
          />
        </Link>
        <div className="flex flex-1 justify-center xs:flex-col xs:gap-4 md:flex-row md:gap-20">
          {FooterData.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h5 className="font-semibold text-white">
                {t(`homePage.footer.${item.page}.${item.title}`)}
              </h5>
              {item.page === "social" ? (
                <div className="flex items-center gap-6">
                  <Link href={"/coming-soon"}>
                    <IconFaceBook />
                  </Link>
                  <Link href={"/coming-soon"}>
                    <YoutubeIcon />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {item.itemFooter.map((itemFooter, index) => (
                    <Link
                      href={itemFooter.link}
                      key={index}
                      className="text-sm text-white hover:text-[#dd9933]"
                    >
                      {t(`homePage.footer.${item.page}.${itemFooter.label}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
