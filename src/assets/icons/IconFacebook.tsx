import React, { useState } from "react";
export const IconFaceBook = ({isAnimate=true}:{isAnimate?:boolean}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <g clipPath="url(#clip0_1_11)">
        <path
          d="M24 12.127c0-6.628-5.373-12-12-12s-12 5.372-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.386H7.078v-3.468h3.047V9.483c0-3.008 1.791-4.669 4.533-4.669 1.313 0 2.686.234 2.686.234v2.954H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.08 24 18.116 24 12.127z"
          fill={isHover&&isAnimate ? "#fff" : "#1877F2"}
        />
        <path
          d="M16.671 15.595l.532-3.468h-3.328V9.876c0-.95.465-1.874 1.956-1.874h1.513V5.048s-1.374-.234-2.686-.234c-2.742 0-4.533 1.661-4.533 4.669v2.644H7.078v3.468h3.047v8.386a12.096 12.096 0 003.75 0v-8.386h2.796z"
          fill={isHover&&isAnimate ? "#1877F2" : "#fff"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_11">
          <path fill="#fff" transform="translate(0 .127)" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
