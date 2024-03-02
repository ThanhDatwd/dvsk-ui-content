import { GIftIcon } from "@/assets/icons/GIftIcon";
import { Gift, Giftbox } from "@/interfaces/Giftbox";
import { getStaticURL } from "@/utils/constants";
import { t } from "i18next";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { Modal } from "../controls/Modal";
import { ButtonPrimary } from "../core/Button";

export const ModalMapGiftBox = ({
  openModal,
  setOpenModal,
  giftBoxData,
  onLockGift,
  onBuyGift,
  loading,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  giftBoxData: Giftbox;
  onLockGift: (boxId: number) => void;
  onBuyGift: (boxId: number) => void;
  loading: boolean;
}) => {
  const [boxIsPicked, setBoxIsPicked] = useState<number | null>();
  const [boxLocked, setBoxLocked] = useState<Gift | null>();
  const handlePickBox = (boxId: number) => {
    if (!boxLocked) {
      setBoxIsPicked(boxId);
    }
  };
  // const handleUnPickBox = (boxId: number) => {
  //   setBoxIsPicked(null);
  // };

  useEffect(() => {
    if (giftBoxData.userGiftbox.locked) {
      setBoxLocked(giftBoxData.userGiftbox.locked);
      setBoxIsPicked(null);
    } else {
      setBoxLocked(null);
    }
  }, [giftBoxData.userGiftbox.locked]);

  return (
    <Modal
      isOpen={openModal}
      titleModal={""}
      toggleOpenModal={() => {
        setOpenModal(!openModal);
      }}
      className="max-h-[100vh] max-w-full overflow-hidden bg-transparent shadow-none xs:w-full lg:w-fit"
    >
      <div className="mt-6 md:mt-0">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="h-[300px] w-[300px] overflow-auto md:h-fit md:w-fit">
            <div className="h-fit w-[400px]">
              <div className="grid-rows-10 grid grid-cols-10 ">
                {giftBoxData &&
                  Array(100)
                    .fill("")
                    .map((value, index) => {
                      return (
                        <div
                          key={index}
                          className="relative h-[36px] items-center justify-center"
                          onClick={() => {
                            giftBoxData?.giftboxStatuses?.available.includes(
                              index + 1,
                            ) && handlePickBox(index + 1);
                          }}
                        >
                          {boxLocked?.id === index + 1 ? (
                            <div
                              className={`-translate-y-[10%] brightness-125`}
                            >
                              <GIftIcon />
                            </div>
                          ) : (
                            <div
                              className={`h-full w-full ${
                                giftBoxData?.giftboxStatuses?.locked.includes(
                                  index + 1,
                                ) ||
                                giftBoxData?.giftboxStatuses?.completed.includes(
                                  index + 1,
                                )
                                  ? "cursor-not-allowed brightness-75"
                                  : ""
                              }
                          ${boxIsPicked === index + 1 ? "brightness-125" : ""}`}
                            >
                              <GIftIcon />
                            </div>
                          )}
                          {giftBoxData?.giftboxStatuses?.completed.includes(
                            index + 1,
                          ) && (
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-not-allowed">
                              <Image
                                src={`${getStaticURL()}/assets/images/connect_success_icon.png`}
                                alt="walletConnect"
                                width={12}
                                height={10}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
            <div className="border-b-4 border-b-[red]  p-2 text-left">
              <span>{t("giftBaskets")}</span>
            </div>

            {!!boxLocked && (
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div>
                    <GIftIcon />
                  </div>
                  <div className=" flex flex-col justify-start text-left  ">
                    <div>
                      {t("giftBoxNo")}: {boxLocked.id}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!!boxIsPicked && (
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div>
                    <GIftIcon />
                  </div>
                  <div className=" flex flex-col justify-start text-left  ">
                    <div>
                      {t("giftBoxNo")}: {boxIsPicked}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!boxIsPicked && !boxLocked && (
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div className=" flex flex-col justify-start text-left  ">
                    <div>{t("pleaseChooseGiftBox")}</div>
                  </div>
                </div>
              </div>
            )}
            {(boxIsPicked || boxLocked) && (
              <ButtonPrimary
                onClick={() => {
                  if (boxLocked) {
                    onBuyGift(boxLocked?.id);
                    return;
                  }
                  if (boxIsPicked) {
                    onLockGift(boxIsPicked);
                    return;
                  }
                }}
                className={loading ? "cursor-not-allowed" : ""}
                disabled={loading}
              >
                <div className="flex items-center justify-center gap-2">
                  {boxLocked
                    ? t(loading ? "paying" : "pay")
                    : t(loading ? "paying" : "buy")}
                  {loading && (
                    <div className="h-6 w-6">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </ButtonPrimary>
            )}
            {boxLocked && <div>{t("pleasePayBeforeContinue")}</div>}
            {boxLocked && <div>823r8</div>}
          </div>
        </div>
      </div>
    </Modal>
  );
};
