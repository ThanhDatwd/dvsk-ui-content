"use client";

import { FC } from "react";

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};
export const ButtonPrimary: FC<IProps> = ({
  children,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`hover:scale-102 cursor-pointer rounded-md bg-red px-4 py-2 text-white duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
