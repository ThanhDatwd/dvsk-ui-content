"use client";

import { getStaticURL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="w-22 h-20 z-20" href={"/"}>
      <Image
        src={`${getStaticURL()}/assets/images/logo.svg`}
        alt="metamask"
        width={89}
        height={86}
      />
    </Link>
  );
};
