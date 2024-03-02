import { CloseIcon } from "@/assets/icons/CloseIcon";
import { useTheme } from "@/hooks/useTheme";
import { getStaticURL } from "@/utils/constants";
import { chooseTheme } from "@/utils/theme";
import { FC, ReactNode } from "react";

interface Props {
  isOpen: boolean;
  titleModal?: string;
  toggleOpenModal: () => void;
  onClick?: () => void;
  children: ReactNode;
  className?: String;
}

export const ModalComingSoon: FC<Props> = ({
  isOpen,
  titleModal,
  toggleOpenModal,
  children,
  className,
}) => {
  const { theme } = useTheme();
  return (
    <>
      {isOpen && (
        <div
          className="relative z-[80]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-zinc-400 bg-opacity-25 backdrop-blur-sm transition-opacity" />

          <div className="fixed inset-0 z-10 flex justify-center overflow-y-auto">
            <div
              onClick={toggleOpenModal}
              className="flex flex-1 items-center justify-center p-4 text-center sm:p-0"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={` text-dark relative min-w-full overflow-hidden rounded-2xl bg-[#fff] px-5  py-9 sm:my-8 sm:min-w-[450px] ${className}`}
              >
                <div className="w-full pb-4 sm:pb-4">
                  <div className="items-center sm:flex sm:items-start">
                    <div className="text-3xl font-bold ">{titleModal}</div>
                  </div>
                </div>
                <div className="relative p-2 font-merriweather">
                  <div
                    className="absolute right-[30px] top-[20px] z-20"
                    onClick={toggleOpenModal}
                  >
                    <CloseIcon />
                  </div>
                  <div
                    className="relative flex h-full flex-col gap-5 border-2 border-[#CC9933] bg-[#F3D69A] bg-cover p-4"
                    style={{
                      backgroundImage: `url('${getStaticURL()}/assets/images/comingSoonBanner.jpg')`,
                    }}
                  >
                    <div className="w-full overflow-y-auto overflow-x-hidden py-3">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
