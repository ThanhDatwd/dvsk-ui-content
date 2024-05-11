import React from "react";

export const ChevronRightIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="12" fill="#FFF5EB" />
    <path
      d="M14.4844 17.5311L13.6408 16.7071L17.4906 12.8574H4.75V11.6738H17.4982L13.6605 7.82395L14.4844 7L19.75 12.2656L14.4844 17.5311Z"
      fill={props.color || "#6B0E01"}
    />
  </svg>
);
