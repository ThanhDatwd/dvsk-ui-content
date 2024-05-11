import { Gift, GiftboxData } from "@/interfaces/Giftbox";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../controls/Modal";
import { ButtonPrimary } from "../core/Button";
import { useToken } from "@/web3/hooks/useToken";
import { DateTime } from "luxon";
import { onToast } from "@/hooks/useToast";
import { ImageLoad } from "../core/ImageLoad";
import { LoadingSpinner } from "../LoadingSpinner";
import i18next from "i18next";
import Link from "next/link";
import { getStaticScanUrl } from "@/utils/constants";
import { SimpleArrowIcon } from "@/assets/icons/SimpleArrowIcon";

type IProps = {
  history: Gift[] | [];
};
export const HistoryGift: FC<IProps> = ({ history }) => {
  const { t } = useTranslation();
  const [isOpenModalGift, setIsOpenModalGift] = useState(false);
  const { importNFT } = useToken();
  const [nftPicked, setNftPicked] = useState<GiftboxData | null>(null);
  const [isImportingNFT, setIsImportingNFT] = useState(false);

  const handleAddNFT = async (tokenId: string) => {
    setIsImportingNFT(true);

    const result = await importNFT(tokenId);
    if (result) {
      onToast(t("importNFTSuccess"), "success");
      setIsOpenModalGift(false);
    } else {
      onToast(t("importNFTFail"), "error");
    }
    setIsImportingNFT(false);
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-[#DCD3C9]  px-6 py-5 lg:py-2">
      <span className="text-lg">{t("commercialMarketPage.history.title")}</span>
      <div className="flex max-h-[500px] flex-col overflow-y-auto">
        {!!history.length ? (
          history
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
            .map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (!item.txHash) {
                      onToast(t("pleaseWaitAFewMinutes"), "info");
                      return;
                    }
                    setIsOpenModalGift(true);
                    setNftPicked(item.giftboxData);
                  }}
                  className={`group flex justify-between px-2 py-2 ${
                    index % 2 !== 0 ? "bg-[#F0EDE7]" : ""
                  }`}
                >
                  <div className="flex items-center gap-1 group-hover:text-[#BF0D0D]">
                    {/* <EllipseIcon /> */}
                    <span>
                      {t("commercialMarketPage.history.description_buy_1")} 1{" "}
                      {t("commercialMarketPage.history.description_buy_2")}
                    </span>
                  </div>
                  <div className="italic group-hover:text-[#BF0D0D]">
                    {!item.txHash ? t("processing") : t("sentNFT")}
                  </div>
                  <span className="group-hover:text-[#BF0D0D]">
                    {DateTime.fromISO(item.updatedAt).toFormat(
                      "dd/MM/yyyy HH:mm",
                    )}
                  </span>
                  <Link
                    href={`${getStaticScanUrl()}/${item.txHash}`}
                    className="text-sm italic group-hover:text-[#BF0D0D]"
                    target="_blank"
                  >
                    <button
                      className="hover:scale-102 w-fit cursor-pointer border border-red bg-[#6B0E01] bg-opacity-10 px-4 py-1 text-[14px] font-bold text-[#6B0E01] duration-300 "
                    >
                      {t("viewDetail")}
                      <SimpleArrowIcon />
                    </button>
                   
                  </Link>
                </div>
              );
            })
        ) : (
          <div className="flex w-full justify-center">
            <span className="text-center italic">{t("noHistory")}</span>
          </div>
        )}
      </div>
      {nftPicked && (
        <Modal
          isOpen={isOpenModalGift}
          titleModal={""}
          toggleOpenModal={() => {
            setIsOpenModalGift(!isOpenModalGift);
          }}
          className="bg-transparent shadow-none"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="text-[24px] font-extrabold text-[#BF0D0D]">
              {t("congratulations")}
            </span>
            <span className="text-[32px] font-black text-[#000]">
              {t("youHaveOpened")} {nftPicked.metadata.name}
            </span>
            <div>
              <ImageLoad
                width={220}
                height={44}
                url={nftPicked.metadata.image}
                alt={nftPicked.metadata.name}
              />
            </div>
            <div className="mt-5 block text-sm italic lg:hidden">
              *{i18next.t("sentNFTToYou")}
            </div>
            <div className="hidden lg:block">
              <div className="max-w-[300px] text-center italic">
                *{t("nftTransferSuccess")}
              </div>
              <ButtonPrimary
                onClick={() => {
                  handleAddNFT(String(nftPicked.tokenId));
                }}
                className="mt-6"
              >
                <div className="flex items-center justify-center gap-2">
                  {t("addNFT")}
                  {isImportingNFT && (
                    <div className="h-6 w-6">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </ButtonPrimary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
