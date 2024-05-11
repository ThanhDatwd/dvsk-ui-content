import React from "react";
import Link from "next/link";
import Image from "next/image";

export const RewardsCard = ({
  url,
  rewardName,
  imageStyle,
  labelStyle,
}: {
  url: string;
  rewardName: string;
  imageStyle?: string;
  labelStyle?: string;
}) => {
  return (
    <Link
      href="/coming-soon"
      className="transaction group flex flex-col items-center duration-300 ease-out hover:scale-105"
    >
      <div
        className={`relative flex ${imageStyle} bg-white xs:h-8 xs:w-8 lg:h-[100px] lg:w-[100px]`}
      >
        {/* <Image src={url} height={100} width={100} alt="awards" className="bg-white" /> */}
        <div className="absolute top-[100%] w-full text-center">
          <span
            className={` text-center group-hover:text-[#dd9933] xs:hidden xs:text-xs lg:inline lg:text-base ${labelStyle}`}
          >
            {rewardName}
          </span>
        </div>
      </div>
    </Link>
  );
};
