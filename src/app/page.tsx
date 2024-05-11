"use client";
import { useTranslation } from "react-i18next";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { t } = useTranslation();
  const { theme } = useTheme();


  

  return (
    <DefaultLayout
      pageTitle="Dashboard"
      containerStyle="bg-white dark:bg-[#222327]"
    >
      <div className="flex flex-col md:py-20">
      Đại Việt Sủ ký
        </div>
    </DefaultLayout>
  );
}
