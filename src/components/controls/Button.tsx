import classNames from "classnames";
import { FC, ReactNode } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

interface CustomProps {
  text: string;
  textColor?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

type BType = React.ButtonHTMLAttributes<HTMLButtonElement> & CustomProps;

export const Button: FC<BType> = ({
  text,
  textColor,
  isLoading,
  onClick,
  className,
  iconStart,
  iconEnd,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "group flex items-center justify-center gap-4 overflow-hidden rounded-full bg-primary px-4 py-2 text-center text-[17px] font-bold leading-[22px] transition-all duration-300 enabled:hover:scale-105 enabled:hover:transform disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      {/* If not have icon we loading in front of text */}
      {isLoading && !iconStart && !iconEnd && (
        <div className="h-5 w-5">
          <LoadingSpinner />
        </div>
      )}

      {/* If have iconStart we loading into it */}
      {isLoading && iconStart ? (
        <div className="h-5 w-5">
          <LoadingSpinner />
        </div>
      ) : (
        iconStart && iconStart
      )}

      <span className={`${textColor ? textColor : "pb-1 text-white"}`}>
        {text}
      </span>

      {/* If have iconEnd we loading into it */}
      {isLoading && iconEnd ? (
        <div className="h-5 w-5">
          <LoadingSpinner />
        </div>
      ) : (
        iconEnd && iconEnd
      )}
    </button>
  );
};
