"use client";

import { FC, useEffect, useRef, useState } from "react";

interface Props {
  title?: string;
  defaultValue?: { label: string; value: string };
  reverse?: boolean;
  fit?: boolean;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
  bg?: string;
}

export const DropdownScan: FC<Props> = ({
  defaultValue,
  title,
  reverse = false,
  fit = false,
  options,
  onChange,
  className,
  bg = "bg-gray-200",
}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chosen, setChosen] = useState<string>("");
  const [defaultVal, setDefaultVal] = useState<{
    label: string;
    value: string;
  }>();

  useEffect(() => {
    if (defaultValue) {
      !reverse && onChange(defaultValue?.value as string);
      setDefaultVal(defaultValue);
    }
  }, [defaultValue, onChange, reverse]);

  ClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative inline-block w-full" ref={ref}>
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={`flex w-full ${
            fit ? "justify-between" : "justify-center"
          }  gap-x-1.5 rounded-lg ${bg}  whitespace-nowrap px-3 py-2 text-sm shadow-sm ${className}`}
        >
          {(defaultVal?.label as string) || chosen || title || "Options"}

          <svg
            className="-mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`absolute ${isOpen ? "" : "hidden"} right-0 ${
          reverse && "bottom-[120%] w-full"
        } ${
          fit ? "w-full" : "w-40"
        }  z-10 mt-2 origin-top-right rounded-md ${bg} shadow-lg focus:outline-none`}
      >
        <div className="py-1 ">
          {options.map((options, i) => (
            <div
              key={i}
              onClick={() => {
                onChange(options.value);
                setChosen(options.label);
                setIsOpen(false);
                setDefaultVal({ value: "", label: "" });
              }}
              className="block cursor-pointer px-4 py-2 text-left text-sm hover:bg-[#3B3BFC] hover:text-white"
            >
              {options.label}
            </div>
          ))}
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
