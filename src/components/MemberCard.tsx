import Link from "next/link";
import Image from "next/image";
import React from "react";
import LazyLoad from "react-lazyload";
import Loader from "./common/Loader";

export const MemberCard = ({
  url,
  name,
  onClickCard,
}: {
  url: string;
  name: string;
  onClickCard: () => void;
}) => {
  return (
    <div
      onClick={onClickCard}
      className="transaction group flex w-full cursor-pointer flex-col items-center rounded-lg border border-[#9B968E] bg-white duration-300 ease-out hover:scale-105 xs:gap-4 xs:px-4 xs:py-4 md:gap-[20px] md:py-6"
    >
      <LazyLoad once={true} placeholder={<Loader />}>
        <Image
          src={url}
          height={100}
          width={100}
          alt="Member"
          className="h-[100px] w-[100px] rounded-full"
        />
      </LazyLoad>
      <span className="text-center text-base group-hover:text-[#dd9933]">
        {name}
      </span>
    </div>
  );
};
