import React, { useState } from "react";
import Image from "next/image";
import { MemberCard } from "../MemberCard";
import { getStaticURL } from "@/utils/constants";
import ReactPaginate from "react-paginate";
import { ArrowRightIcon } from "@/assets/icons/ArrowRightIcon";
import { ArrowLeftIcon } from "@/assets/icons/ArrowLeftIcon";
import { TitleSection } from "./TitleSection";
import { useTranslation } from "react-i18next";
import { teamInfo } from "@/utils/constants";
import LazyLoad from "react-lazyload";
import Loader from "../common/Loader";
import { MemberCardType } from "@/utils/type";

export const DevelopmentTeamSection = () => {
  const { t } = useTranslation();
  const [selectMember, setSelectMember] = useState<MemberCardType>({
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "CEO - XBox Studio",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  });

  const handlePageClick = () => {};

  return (
    <div
      className="relative bg-cover xs:gap-8 xs:px-4 xs:py-8 md:px-14 md:py-20"
      style={{
        backgroundImage: `url('${getStaticURL()}/assets/images/banner-dev-team.png')`,
        width: "100vw",
      }}
    >
      <div className="mx-auto flex max-w-[1504px] flex-col lg:gap-16">
        <TitleSection title={t("homePage.developmentTeam.title")} />
        <div className="flex gap-6 xs:flex-col md:flex-row">
          <div className="flex flex-col gap-6">
            <LazyLoad once={true} placeholder={<Loader />}>
              <Image
                width={427}
                height={236}
                alt="Member"
                src={selectMember?.bannerUrl}
                className="w-full min-w-[427px]"
              />
            </LazyLoad>
            <div className="flex flex-col gap-4 px-4 py-6">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold text-white">
                  {selectMember?.name}
                </span>
                <span className="text-sm text-gray-300">
                  {selectMember.position}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-white">
                  {selectMember.infoMore.info1}
                </span>
                <span className="text-sm text-white">
                  {selectMember.infoMore.info2}
                </span>
                <span className="text-sm text-white">
                  {selectMember.infoMore.info3}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-10">
            <div className="grid xs:grid-flow-col xs:grid-rows-4 xs:gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-6">
              {teamInfo.map((item, index) => (
                <MemberCard
                  key={index}
                  url={item.avatarUrl}
                  name={item.name}
                  onClickCard={() => setSelectMember(item)}
                />
              ))}
            </div>
            <ReactPaginate
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={2}
              nextLabel={
                <button>
                  <ArrowLeftIcon color="#17191F" />
                </button>
              }
              previousLabel={
                <button>
                  <ArrowRightIcon color="#17191F" />
                </button>
              }
              renderOnZeroPageCount={null}
              containerClassName="flex gap-4 bg-red items-center justify-center text-sm font-bold text-[#17191F]"
              pageClassName="bg-[#F3F3F3] rounded-full"
              pageLinkClassName="hover:underline rounded-full w-8 h-8 text-[#17191F] flex justify-center items-center hover:border hover:border-[#64251c]"
              activeClassName="activePage text-white rounded-full w-8 h-8 flex justify-center items-center"
              activeLinkClassName="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
