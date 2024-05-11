"use client";
import { CopyIcon } from "@/assets/icons/CopyIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { StarBoldIcon } from "@/assets/icons/StarBoldIcon";
import { StarIcon } from "@/assets/icons/StarIcon";
import { ModalComingSoon } from "@/components/ModalComingSoon";
import { ModalConnectWallet } from "@/components/ModalConnectWallet";
import { Modal } from "@/components/controls/Modal";
import { ButtonPrimary } from "@/components/core/Button";
import { FrameSquart, FrameSquartNormal } from "@/components/core/FrameSquart";
import TruncateText from "@/components/core/TruncateText";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { onToast } from "@/hooks/useToast";
import { GiftboxData } from "@/interfaces/Giftbox";
import { useConnectorByName } from "@/pkgs/augmentlab-wallet-connector/connector";
import { useAugmentlabsWalletContext } from "@/pkgs/augmentlab-wallet-connector/context";
import { E_NETWORK_ID } from "@/pkgs/augmentlab-wallet-connector/types";
import { debounce } from "@/utils";
import {
  NFT_CHARACTER_INFO,
  getStaticURL,
  listCharacter,
} from "@/utils/constants";
import { useNFT } from "@/web3/hooks/useNFT";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LazyLoad from "react-lazyload";

export default function NFT() {
  const { t } = useTranslation();
  const [inputSearch, setInputSearch] = useState("");
  const [nftCharacterList, setNFTCharacterList] = useState<GiftboxData[]>(
    Object.entries(NFT_CHARACTER_INFO).map((item) => {
      const tokenId = Number(item[0]);
      const dataCharacter = listCharacter.find(
        (item) => item.tokenId === tokenId,
      );
      return {
        rarity: String(dataCharacter?.rate),
        tokenAddress: process.env.NEXT_PUBLIC_NFT_ADDRESS ?? "",
        tokenId,
        metadata: {
          ...item[1],
          description:
            dataCharacter?.introduces.join(" ") ?? item[1].description,
        },
      };
    }),
  );
  const [loading, setLoading] = useState(false);
  const [openModalComingSoon, setOpenModalComingSoon] =
    useState<boolean>(false);
  const [nftToView, setNftToView] = useState<GiftboxData | null>(null);
  useState<boolean>(false);
  const { connectorName } = useAugmentlabsWalletContext();
  const {
    hook,
    connector: { provider },
  } = useConnectorByName(connectorName);
  const account = hook.useAccount();
  const networkSeleted = hook.useChainId() as E_NETWORK_ID;

  const { getQuantity } = useNFT();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const starsQuantity = [3, 4, 5];
  const handleSearch = (value: any) => {
    handleFindCharacter(value);
  };
  const handleFindCharacter = (name: string) => {
    const newCharacter = Object.entries(NFT_CHARACTER_INFO)
      .map((item) => {
        const tokenId = Number(item[0]);
        return {
          rarity: String(
            listCharacter.find((item) => item.tokenId === tokenId)?.rate,
          ),
          tokenAddress: process.env.NEXT_PUBLIC_NFT_ADDRESS ?? "",
          tokenId: Number(item[0]),
          metadata: item[1],
        };
      })
      .filter((character) =>
        character.metadata.name
          .toLocaleLowerCase()
          .includes(name.toLocaleLowerCase()),
      );
    setNFTCharacterList(newCharacter);
  };

  const hashAccount = useMemo(() => {
    if (account) {
      return `${account.slice(0, 4)}...${account.slice(
        account.length - 4,
        account.length,
      )}`;
    }

    return "";
  }, [account, connectorName]);
  useEffect(() => {
    if (account && networkSeleted) {
      fetchUserNFT();
    }
  }, [account, networkSeleted]);

  const fetchUserNFT = async () => {
    if (!account || !networkSeleted) return;

    nftCharacterList.map(async (item, index) => {
      const quantity = await getQuantity(item.tokenId.toString());
      nftCharacterList[index].quantity = Number(quantity);
      setNFTCharacterList([...nftCharacterList]);
    });
  };

  const debounceSearchHandle = debounce(handleSearch, 500);

  return (
    <DefaultLayout pageTitle="Dashboard" containerStyle="">
      <div
        className="fixed -z-10 bg-cover"
        style={{
          backgroundImage: `url('${getStaticURL()}/assets/images/banner.jpg')`,
          width: "100vw",
          minHeight: "100vh",
        }}
      />
      <div className="min-h-[100vh] pt-20 xs:px-4 xs:pb-8 md:px-14 md:py-20 lg:pt-40 ">
        <div className="mx-auto flex max-w-[1504px] flex-col xs:gap-4 md:gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between gap-6 xs:flex-col-reverse xs:items-end md:flex-row">
              <div className="relative flex w-full flex-1 items-center gap-2 border border-red bg-[#DCD3C9] p-2 md:max-w-[400px]">
                <SearchIcon className="z-10 cursor-pointer" />
                <input
                  ref={searchInputRef}
                  value={inputSearch}
                  onChange={(event) => {
                    setInputSearch(event.target.value);
                    debounceSearchHandle(event.target.value);
                  }}
                  type="text"
                  placeholder={t("diverseCharacters.searchPlaceholder")}
                  className="z-10 flex-1 border-none bg-transparent outline-none placeholder:text-[#828282]"
                />
              </div>

              {account && (
                <div className="flex items-center gap-[11px] xs:w-full sm:w-fit">
                  <div className="item-center flex w-full justify-center gap-4 border border-red bg-[#DCD3C9] p-2">
                    <div className="relative w-full  border-[#6B0E01]">
                      <input
                        disabled
                        className="bg-transparent px-2 py-1 outline-none"
                        type="text"
                        value={hashAccount}
                      />
                      <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(account);
                          onToast(t("copied"), "success");
                        }}
                      >
                        <CopyIcon />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <div className="overflow-auto">
                <table className="w-full min-w-max table-auto border-collapse border border-red">
                  <thead className="border-b border-red bg-[#F0EDE7]">
                    <tr>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.id")}
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.name")}
                      </th>

                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        NFTs
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.level")}
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.quantity")}
                      </th>
                      <th
                        scope="col"
                        className="p-6 text-center font-merriweather text-xl capitalize"
                      >
                        {t("table.description")}
                      </th>
                    </tr>
                  </thead>
                  {account && nftCharacterList.length > 0 && (
                    <tbody className=" bg-white ">
                      {nftCharacterList.map((nft, index) => (
                        <tr
                          key={nft.tokenId}
                          className={`${
                            index % 2 === 0 ? "bg-[#E0D6CB]" : "bg-[#D5CABD]"
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-center">{nft.tokenId}</div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-center">
                              {nft.metadata.name}
                            </div>
                          </td>

                          <td className="min-w-[150px] whitespace-nowrap md:py-4 lg:px-6 ">
                            <div className="rounded-lg border-2 border-red bg-gradient-to-b from-[#F6DFB0] to-[#F8CC70] p-4 text-center text-gray-500 ">
                              <div
                                className="relative w-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
                                style={{ paddingBottom: "133%" }}
                              >
                                <LazyLoad>
                                  <Image
                                    src={nft.metadata.image}
                                    alt={nft.metadata.name}
                                    className="absolute inset-0 h-full w-full  object-cover"
                                    width={300}
                                    height={400}
                                  />
                                </LazyLoad>
                              </div>
                            </div>
                          </td>
                          <td className=" px-6 py-4">
                            <div className="flex justify-center">
                              {Array.from(
                                { length: Number(nft.rarity) },
                                (_, index) => (
                                  <StarBoldIcon key={index} />
                                ),
                              )}
                            </div>
                          </td>
                          <td className=" px-6 py-4">
                            <div className="text-center">{nft.quantity}</div>
                          </td>
                          <td className="max-w-[300px] px-6 py-4">
                            <div className="text-center">
                              <TruncateText
                                text={t("introduceNFT." + nft.tokenId)}
                                maxLength={200}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
              {account && nftCharacterList.length == 0 && (
                <div className="flex min-h-[200px] w-full items-center justify-center bg-[#E0D6CB]">
                  <div className="p-2">{t("noData")}</div>
                </div>
              )}
              {!account && (
                <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 bg-[#E0D6CB]">
                  <div className="p-2 text-center text-xl">
                    {t("pleaseConnectWalletToSeeOwnNFT")}
                  </div>
                  <ButtonPrimary
                    onClick={() => {
                      document.getElementById("wallet-connect")?.click();
                    }}
                    className="text-lg md:min-w-[300px]"
                  >
                    {t("commercialMarketPage.connectWallet.button")}
                  </ButtonPrimary>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-10 lg:hidden">
              {account &&
                nftCharacterList.length > 0 &&
                nftCharacterList.map((nft, index) => {
                  return (
                    <div
                      key={nft.tokenId}
                      className="mx-auto w-full max-w-[600px]"
                    >
                      <FrameSquartNormal
                        className={
                          index % 2 === 0 ? "bg-[#F3D69A]" : "bg-[#F0EDE7]"
                        }
                      >
                        <div className=" flex w-full gap-2 p-3">
                          <div
                            className={`flex w-1/2 items-center rounded-md border-2 border-red p-4 text-center text-gray-500 ${
                              index % 2 === 0
                                ? "bg-white/[.2]"
                                : "bg-gradient-to-b from-[#F6DFB0] to-[#F8CC70]"
                            }`}
                          >
                            <div
                              className="relative w-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
                              style={{ paddingBottom: "133%" }}
                              onClick={() => {
                                setNftToView(nft);
                              }}
                            >
                              <LazyLoad>
                                <Image
                                  src={nft.metadata.image}
                                  alt={nft.metadata.name}
                                  className="absolute inset-0 h-full w-full object-cover"
                                  width={300}
                                  height={400}
                                />
                              </LazyLoad>
                            </div>
                          </div>
                          <div className="flex w-1/2 flex-col gap-1 font-merriweather text-xs md:text-sm">
                            <div>
                              <span className="font-bold">ID</span>:&nbsp;
                              {nft.tokenId}
                            </div>
                            <div>
                              <span className="font-bold">
                                {t("table.name")}
                              </span>
                              :&nbsp;{nft.metadata.name}
                            </div>
                            <div className="flex items-center">
                              <span className="font-bold">
                                {t("table.level")}
                              </span>
                              :&nbsp;
                              <div className="flex justify-start">
                                {Array.from(
                                  { length: Number(nft.rarity) },
                                  (_, index) => (
                                    <StarBoldIcon key={index} />
                                  ),
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="font-bold">
                                {t("table.quantity")}
                              </span>
                              :&nbsp;
                              {nft.quantity}
                            </div>
                            <div>
                              <span className="font-bold">
                                {t("table.description")}
                              </span>
                              :&nbsp;
                              <div className="">
                                <TruncateText
                                  text={t("introduceNFT." + nft.tokenId)}
                                  maxLength={50}
                                  toggleOpenView={() => {
                                    if (nftToView) {
                                      setNftToView(null);
                                    } else {
                                      setNftToView(nft);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </FrameSquartNormal>
                    </div>
                  );
                })}
              {account && nftCharacterList.length == 0 && (
                <div className="flex min-h-[200px] w-full items-center justify-center bg-[#E0D6CB]">
                  <div className="p-2">{t("noData")}</div>
                </div>
              )}
              {!account && (
                <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 bg-[#E0D6CB]">
                  <div className="p-2 text-center text-xl">
                    {t("pleaseConnectWalletToSeeOwnNFT")}
                  </div>
                  <ButtonPrimary
                    onClick={() => {
                      document.getElementById("wallet-connect")?.click();
                    }}
                    className="text-lg md:min-w-[300px]"
                  >
                    {t("commercialMarketPage.connectWallet.button")}
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        </div>
        <ModalComingSoon
          isOpen={openModalComingSoon}
          titleModal={""}
          toggleOpenModal={() => setOpenModalComingSoon(!openModalComingSoon)}
          className="bg-transparent shadow-none"
        >
          <div className="flex flex-col items-center justify-center gap-4 md:h-[300px] md:w-[600px]">
            <div className="text-[24px] font-bold uppercase text-white md:text-[40px]">
              {t("characterIsBeingFinished")}
            </div>
            <button
              onClick={() => {
                setOpenModalComingSoon(!openModalComingSoon);
              }}
              className="hover:scale-102 w-fit cursor-pointer rounded-lg border border-red bg-[#6B0E01]  px-4 py-2 text-[14px] font-bold text-white duration-300 "
            >
              {t("confirm")}
            </button>
          </div>
        </ModalComingSoon>
        <ModalConnectWallet />
        <Modal
          isOpen={nftToView ? true : false}
          toggleOpenModal={() => setNftToView(null)}
          className="bg-transparent shadow-none"
        >
          <div className="max-h-[70vh] overflow-y-auto">
            {nftToView && (
              <>
                <div
                  className="relative w-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
                  style={{ paddingBottom: "133%" }}
                >
                  <LazyLoad>
                    <Image
                      src={nftToView?.metadata.image}
                      alt={nftToView.metadata.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      width={500}
                      height={700}
                    />
                  </LazyLoad>
                </div>
                <div className="mt-4">
                  <span className="font-bold">{t("table.description")}</span>
                  :&nbsp;
                  <div className="">
                    <TruncateText
                      text={t("introduceNFT." + nftToView?.tokenId)}
                      maxLength={200}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </DefaultLayout>
  );
}
