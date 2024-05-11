"use client";

import { FC } from "react";

import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useTheme } from "@/hooks/useTheme";
import { isDarkTheme } from "@/utils/theme";

interface SearchInputProps {
  initValue?: string;
  placeholder?: any;
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  initValue,
  placeholder,
  onChange,
}) => {
  const { theme } = useTheme();

  return (
    <div className="mb-5 flex items-center gap-2 rounded-xl border border-black p-2 dark:border-white md:mb-0">
      <SearchIcon color={isDarkTheme(theme) ? "#ffffff" : "#000000"} />
      <input
        spellCheck={false}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder={placeholder || ""}
        className="bg-transparent leading-[28px] outline-none lg:max-w-[80px] xl:max-w-none"
      />
    </div>
  );
};
