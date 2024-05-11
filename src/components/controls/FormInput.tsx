import classNames from "classnames";
import { FC, ReactNode } from "react";

type IProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
  helper?: string;
  error?: string;
  label?: string;
  className?: string;
  underLine?: boolean;
  endIcon?: ReactNode;
};

const FormInput: FC<IProps> = (props) => {
  const {
    isError,
    helper,
    label,
    error,
    className,
    underLine,
    endIcon,
    ...rest
  } = props;
  return (
    <div className="w-full text-start ">
      {label && (
        <label
          className={`mb-3 block font-semibold ${
            isError ? "text-[#E53E3E]" : "text-gray-500"
          }`}
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <div
        className={`${classNames({
          "relative pr-6": endIcon,
        })} rounded-lg border border-gray-300 py-1`}
      >
        <input
          className={classNames(
            `w-full bg-transparent px-3 py-1 text-[16px] leading-[28px] focus:outline-0`,
            className,
          )}
          {...rest}
        />
        {endIcon}
      </div>
      {underLine && <div className="border-b border-white/[.1]" />}
      {!isError && helper ? (
        <p>{helper}</p>
      ) : (
        <p className="text-[12px] text-[#E53E3E]">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
