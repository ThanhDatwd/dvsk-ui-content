"use client";

import { FC, useRef, useState } from "react";

import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useTheme } from "@/hooks/useTheme";
import { isDarkTheme } from "@/utils/theme";
import { debounce } from "@/utils";
import { useTranslation } from "react-i18next";

declare const window: any;
interface Iprops {
  handleFocus?: VoidFunction;
  handleBlur?: VoidFunction;
}
export const SearchInBrowser = ({ handleFocus, handleBlur }: Iprops) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [focusSearch, setFocusSearch] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [wi, setWi] = useState(0);

  const handleSearch = () => {
    if (searchInputRef.current) {
      const term = searchInputRef.current.value;

      if (term) {
        setSearchTerm(term);
        findAndHighlight(term);
      }
    }
  };
  const debounceSearchHandle = debounce(handleSearch, 900);

  const findAndHighlight = (term: string, forward = true) => {
    const success = window.find(
      term,
      false,
      false,
      true,
      false,
      forward,
      false,
    );

    if (!success) {
      alert("Text not found");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      findAndHighlight(searchTerm, true);
    }
  };

  return (
    <div className="mb-5 flex items-center gap-2 rounded-xl border border-black p-2 dark:border-white md:mb-0">
      <div
        className="cursor-pointer"
        onClick={() => {
          setWi(80);
          handleFocus && handleFocus();
          document.getElementById("input-search")?.focus();
        }}
      >
        <SearchIcon color={isDarkTheme(theme) ? "#ffffff" : "#000000"} />
      </div>
      <input
        id="input-search"
        ref={searchInputRef}
        spellCheck={false}
        onKeyDown={handleKeyPress}
        onChange={(event) => {
          debounceSearchHandle(event.target.value);
        }}
        placeholder={wi === 0 ? "" : t("search")}
        className={`bg-transparent leading-[28px] outline-none lg:w-[${wi}px] w-full duration-300 ease-out xl:max-w-none`}
        onBlur={() => {
          setFocusSearch(false);
          setWi(0);
          handleBlur && handleBlur();
        }}
        onFocus={() => {
          setFocusSearch(true);
          // setWi(80);
          // handleFocus && handleFocus();
        }}
      />
      <div className="rounded-md border p-1 text-xs">CTRL</div>
      <div className="rounded-md border p-1 text-xs">K</div>
    </div>
  );
};
