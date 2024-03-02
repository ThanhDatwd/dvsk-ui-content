"use client";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { StarIcon } from "@/assets/icons/StarIcon";
import { CharacterCard } from "@/components/CharacterCard";
import { ModalComingSoon } from "@/components/ModalComingSoon";
import Loader from "@/components/common/Loader";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { useTheme } from "@/hooks/useTheme";
import { debounce } from "@/utils";
import { getStaticURL, listCharacter } from "@/utils/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LazyLoad from "react-lazyload";

export default function Character() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [inputSearch, setInputSearch] = useState("");
  const [rateFilter, setRateFilter] = useState<number>();
  const [characterList, setCharacterList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModalComingSoon, setOpenModalComingSoon] =
    useState<boolean>(false);

  const [focusSearch, setFocusSearch] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const starsQuantity = [3, 4, 5];
  const handleSearch = (value: any) => {
    handleFindCharacter(value);
  };
  const handleFindCharacter = (name: string) => {
    const newCharacter = listCharacter.filter((character) =>
      character.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
    );
    setCharacterList(newCharacter);
  };

  const debounceSearchHandle = debounce(handleSearch, 500);
  useEffect(() => {
    setLoading(false);
    setCharacterList(listCharacter);
  }, []);

  return (
    <DefaultLayout
      pageTitle="Dashboard"
      containerStyle="bg-white dark:bg-[#222327]"
    >
      <div className="min-h-[100vh] bg-primary pt-20 xs:px-4 xs:pb-8 md:px-14 md:py-20 lg:pt-40 ">
        <div className="mx-auto flex max-w-[1504px] flex-col  xs:gap-8 md:gap-20">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-amatica text-[64px] font-bold text-[#17191F]">
              {t("diverseCharacters.title")}
            </h2>
            <span className="text-center text-[#17191F] xs:w-2/3 md:w-1/3">
              {t("diverseCharacters.subTitle")}
            </span>
          </div>
          <div className="flex flex-col xs:gap-8 md:gap-[60px]">
            <div className="flex gap-6 xs:flex-col md:flex-row ">
              <div className=" btn relative flex flex-1 gap-2 border border-[#9B968E] p-2">
                <span />
                <SearchIcon className="z-10 cursor-pointer" />
                <input
                  ref={searchInputRef}
                  value={inputSearch}
                  onChange={(event) => {
                    setInputSearch(event.target.value);
                    debounceSearchHandle(event.target.value);
                  }}
                  type="text"
                  placeholder={t("diverseCharacters.searchPlaceholder")}
                  className="z-10 flex-1 border-none bg-transparent outline-none placeholder:text-[#828282]"
                />
                <div className="search">
                  <span />
                </div>
                {/* <div className=" absolute top-[50%] translate-y-[50%] left-0 p-2 border border-[#9B968E] w-fit">Không tìm thấy tướng này</div> */}
              </div>
              <div className="flex items-center gap-[11px]">
                <span>{t("diverseCharacters.strength")}</span>
                <div className="flex gap-1">
                  {starsQuantity.map((star, index) => (
                    <div
                      onClick={() => setRateFilter(star)}
                      key={index}
                      className={`transaction flex cursor-pointer items-center gap-2 rounded-lg py-[6px] pl-4 pr-2 duration-300 ease-out hover:scale-105 ${
                        star == rateFilter
                          ? "border-none bg-[#6B0E01] text-white"
                          : "border border-[#6B0E01] bg-transparent text-[#6B0E01]"
                      }`}
                    >
                      <span>{star}</span>
                      <StarIcon
                        color={star == rateFilter ? "#D9D9D9" : "#6B0E01"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex w-full justify-center">
                <div className=" w-fit  p-2">Loading...</div>
              </div>
            ) : characterList.length > 0 ? (
              <div
                className="grid gap-6 xs:grid-cols-1 md:grid-cols-4"
                onClick={(e) => {
                  // setOpenModalComingSoon(true);
                }}
              >
                {characterList.map((character, index) => {
                  if (rateFilter !== undefined) {
                    if (character.rate === rateFilter) {
                      return (
                        <CharacterCard
                          key={index}
                          linkTo={`/character/${character.slug}`}
                          characterName={character.name}
                          rate={character.rate}
                          url={
                            character.url
                              ? `${getStaticURL()}/assets/images/2d/${
                                  character.url
                                }`
                              : ""
                          }
                          value={character.value}
                        />
                      );
                    }
                  } else {
                    return (
                      <LazyLoad
                        key={index}
                        once={true}
                        placeholder={<Loader />}
                      >
                        <CharacterCard
                          key={index}
                          linkTo={`/character/${character.slug}`}
                          characterName={character.name}
                          rate={character.rate}
                          url={
                            character.url
                              ? `${getStaticURL()}/assets/images/2d/${
                                  character.url
                                }`
                              : ""
                          }
                          value={character.value}
                        />
                      </LazyLoad>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <div className=" w-fit  p-2">Không tìm thấy tướng này</div>
              </div>
            )}
          </div>
        </div>
        <ModalComingSoon
          isOpen={openModalComingSoon}
          titleModal={""}
          toggleOpenModal={() => setOpenModalComingSoon(!openModalComingSoon)}
          className="bg-transparent shadow-none"
        >
          <div className="md:h-[300px] md:w-[600px] flex flex-col justify-center items-center gap-4">
            <div className="text-[24px] md:text-[40px] font-bold uppercase text-white">
              {t("characterIsBeingFinished")}
            </div>
            <button
              onClick={() => {
                setOpenModalComingSoon(!openModalComingSoon);
              }}
              className="hover:scale-102 w-fit rounded-lg cursor-pointer border border-red bg-[#6B0E01]  px-4 py-2 text-[14px] font-bold text-white duration-300 "
            >
              {t("confirm")}
            </button>
          </div>
        </ModalComingSoon>
      </div>
    </DefaultLayout>
  );
}
