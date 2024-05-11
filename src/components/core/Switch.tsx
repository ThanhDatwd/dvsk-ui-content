"use client";

import { FC, useEffect, useRef, useState } from "react";

interface Props {
  options: { label: string; value: string }[];
  defaultValue?: { label: string; value: string };
  onChange: (value: string) => void;
}
export const Switch: FC<Props> = ({ options, defaultValue, onChange }) => {
  const isFirstRender = useRef(true);
  const [chosen, setChosen] = useState<string>(options[0].label);

  useEffect(() => {
    if (defaultValue && isFirstRender.current) {
      setChosen(defaultValue?.label as string);
    }
  }, [defaultValue]);

  return (
    <div className="flex w-full justify-end rounded-full bg-gray-200 md:w-fit">
      {options.map((option) => (
        <button
          key={option.value}
          className={`w-full whitespace-nowrap rounded-full px-2 pb-2 pt-1 md:w-fit  ${
            chosen === option.label
              ? "bg-primary font-bold text-white"
              : "font-thin text-gray-400"
          }`}
          onClick={() => {
            onChange(option.value);
            setChosen(option.label);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
