import React from "react";
export const DocIcon = ({ bg, color }: { bg?: string; color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={39}
    height={40}
    viewBox="0 0 39 40"
    fill={color}
  >
    <rect y={0.5} width={39} height={39} rx={4} fill={bg || "#F6F6F6"} />
    <path
      d="M16.25 26.75h7.5v-1.5h-7.5v1.5zm0-4h7.5v-1.5h-7.5v1.5zm-1.942 7.75c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.283V13.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h7.942l5.25 5.25v11.942c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H14.308zm7.192-13V13h-7.192a.294.294 0 00-.212.096.294.294 0 00-.096.212v15.384c0 .077.032.148.096.212a.294.294 0 00.212.096h11.384a.294.294 0 00.212-.096.294.294 0 00.096-.212V17.5h-4.5z"
      fill={color || "#333"}
    />
  </svg>
);