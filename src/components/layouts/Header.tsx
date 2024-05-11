"use client";


import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { Logo } from "../Logo";

const Header = ({ headerStyle }: {headerStyle?:string }) => {
  const { t } = useTranslation();
  const [isShow,setIsShow] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="w-full fixed top-0 z-40">
      <nav
        className={`bg-[#222327] max-w-[1504px] mx-auto px-14 py-4 flex items-center transition-all shadow-none duration-250 ease-soft-in ${headerStyle}`}
        navbar-scroll="true"
      >
        <Logo/>
      </nav>
        
    </div>
  );
};

export default Header;