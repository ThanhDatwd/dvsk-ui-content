"use client";

import { getStaticURL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="z-20 xs:h-12 xs:w-12 lg:h-[86px] lg:w-[90px]" href={"/"}>
      <Image
        className="h-full w-full "
        src={`${getStaticURL()}/assets/images/logo.png`}
        alt="metamask"
        width={90}
        height={86}
      />
    </Link>
  );
};
