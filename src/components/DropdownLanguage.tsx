"use client";

import { LanguageIcon } from "@/assets/icons/LanguageIcon";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  title?: string;
  defaultValue?: { label: string; value: string };
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
  overlayBgStyle?: string;
  modalLanguageStyle?: string;
  languageItemStyle?: string;
  colorIcon?: string;
  position?: string;
}

export const DropdownLanguage: FC<Props> = ({
  defaultValue,
  title,
  options,
  onChange,
  className,
  overlayBgStyle = "bg-opacity-0",
  modalLanguageStyle,
  languageItemStyle = "py-2",
  colorIcon,
  position = "right-0 top-10 origin-top-right",
}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chosen, setChosen] = useState<{
    label: string;
    value: string;
  }>();
  const [defaultVal, setDefaultVal] = useState<{
    label: string;
    value: string;
  }>();

  useEffect(() => {
    if (defaultValue) {
      setDefaultVal(defaultValue);
    }
  }, [defaultValue]);

  ClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div
      className="relative flex w-full justify-center text-left md:inline-block"
      ref={ref}
    >
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={`group mt-1 inline-flex w-full items-center gap-x-1.5  whitespace-nowrap rounded-lg py-1 text-[16px] ${className} fill-[red]`}
        >
          <LanguageIcon
            color={colorIcon || "#ffffff"}
            className="group-hover:rotate-[20deg]"
          />
          {defaultVal?.label}
        </button>
      </div>
      <div
        className={`absolute  ${position} z-30  scale-0 shadow-lg duration-200 ease-linear focus:outline-none ${
          isOpen ? "opacity-1 scale-100" : "opacity-0"
        } ${modalLanguageStyle}`}
      >
        <div className="relative border border-[#9B968E] bg-[#DCD3C9] p-1">
          <div className=" absolute left-0 top-0 z-10 flex w-full justify-between">
            <div className="h-[10px] w-[10px] border-b border-r border-[#9B968E] "></div>
            <div className="h-[10px] w-[10px] border-b border-l border-[#9B968E] "></div>
          </div>
          <div className="relative flex h-full flex-col justify-center gap-2 border border-[#9B968E] bg-[#DCD3C9] p-2">
            {options.map((options, i) => (
              <div
                key={i}
                onClick={() => {
                  if (chosen?.label !== options.label) {
                    onChange(options.value);
                    setChosen(options);
                    setIsOpen(false);
                    setDefaultVal({ value: "", label: "" });
                  }
                }}
                className={`block px-4 text-sm ${
                  chosen?.label !== options.label
                    ? "text-dark cursor-pointer hover:bg-primary dark:text-[#FAFAFA] dark:hover:bg-secondaryDark"
                    : "bg-primary dark:bg-secondaryDark dark:text-[#FAFAFA] "
                } ${languageItemStyle} `}
              >
                {options.label}
              </div>
            ))}
          </div>
          <div className=" absolute bottom-0 left-0 z-10 flex w-full justify-between">
            <div className="h-[10px] w-[10px] border-r border-t border-[#9B968E]"></div>
            <div className="h-[10px] w-[10px] border-l border-t border-[#9B968E]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClickOutside = (ref: any, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
