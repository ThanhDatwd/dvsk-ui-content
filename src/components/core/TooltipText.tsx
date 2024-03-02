import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface TooltipProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
}

const TooltipText: React.FC<TooltipProps> = ({
  children,
  text,
  className = "-top-14 right-1/2 translate-x-1/2",
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { t } = useTranslation();
  const [isPlayMusic, setIsPlayMusic] = useState<boolean>(false);


  return (
    <div
      className=" relative inline-block"
      onMouseEnter={() => {
        setShowTooltip(true);
        // const mouseBox = document.getElementById("mouse-box");
        // if (mouseBox && mouseBox.style.opacity == "1") {
        //   setIsPlayMusic(true);
        //   mouseBox.style.opacity = "0";
        // }
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
        // const mouseBox = document.getElementById("mouse-box");
        // if (mouseBox && isPlayMusic) {
        //   mouseBox.style.opacity = "1";
        // }
      }}
    >
      {children}
      {showTooltip && (
        <div
          className={
            "absolute  z-[9998]  items-center gap-2 whitespace-nowrap rounded-[26px] bg-[#ffffff4d] p-[10px] text-[12px] lg:flex " +
            className
          }
        >
          {t(text ?? "comingSoonFeature")}
        </div>
      )}
    </div>
  );
};

export default TooltipText;
