"use client";

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
      className="flex justify-center md:inline-block text-left w-full relative"
      ref={ref}
    >
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={`inline-flex w-full  gap-x-1.5 rounded-lg px-1.5 py-1 text-sm whitespace-nowrap ${className}`}
        >
          {defaultVal?.label}
        </button>
      </div>
      {/* {isOpen && (
        <div
          className={`fixed inset-0 ${overlayBgStyle} bg-white transition-opacity`}
        />
      )} */}
      <div
        className={`absolute py-1 shadow-lg top-10 right-0 bg-white dark:bg-[#222327] focus:outline-none ${
          isOpen ? "" : "hidden"
        } ${modalLanguageStyle}`}
      >
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
                ? "cursor-pointer hover:bg-primary dark:hover:bg-secondaryDark text-dark dark:text-[#FAFAFA]"
                : "dark:text-[#FAFAFA] bg-primary dark:bg-secondaryDark "
            } ${languageItemStyle} `}
          >
            {options.label}
          </div>
        ))}
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
