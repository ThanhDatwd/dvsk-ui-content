import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@/providers/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import "../styles/index.css";
import { Metadata } from "next";
import { getStaticURL } from "@/utils/constants";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { Web3Provider } from "@/providers/Web3Provider";
import { AugmentlabsWalletProvider } from "@/pkgs/augmentlab-wallet-connector/context";

export const metadata: Metadata = {
  title: "Đại việt sử ký",
  description:
    "Chiến đấu với các anh hùng và danh tướng - Đội quân của bạn sẽ đứng bên cạnh các anh hùng và danh tướng nổi tiếng trong lịch sử chiến tranh.",
  openGraph: {
    title: "Đại Việt sử ký",
    description:
      "Chiến đấu với các anh hùng và danh tướng - Đội quân của bạn sẽ đứng bên cạnh các anh hùng và danh tướng nổi tiếng trong lịch sử chiến tranh.",
    url: `${getStaticURL()}`,
    // siteName: "Next.js",
    images: [
      {
        url: `${getStaticURL()}/assets/images/logo.png`, // Must be an absolute URL
        width: 800,
        height: 600,
        alt: "Logo Đại việt sử ký",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
        useEnterprise={
          !!process.env.NEXT_PUBLIC_CAPTCHA_ENTERPRISE &&
          process.env.NEXT_PUBLIC_CAPTCHA_ENTERPRISE === "true"
        }
      >
        <Head>
          <NextSeo
            title="Đại Việt Sử Ký"
            description="This example uses more of the available config options."
            canonical={`${getStaticURL()}`}
            openGraph={{
              url: `${getStaticURL()}`,
              title: "Đại Việt Sử Ký",
              description:
                "This example uses more of the available config options.",
              images: [
                {
                  url: `${getStaticURL()}/assets/images/logo.png`,
                  width: 800,
                  height: 600,
                  alt: "Banner DVSK",
                  type: "image/png",
                },
              ],
              siteName: "Đại Việt Sử Ký",
            }}
          />
        </Head>
        <html lang="en">
          <body suppressHydrationWarning={true}>
            <ThemeProvider>
              <Web3Provider>
                <AugmentlabsWalletProvider>
                  <ToastContainer theme="dark" />
                  <main>{children}</main>
                </AugmentlabsWalletProvider>
              </Web3Provider>
            </ThemeProvider>
          </body>
        </html>
      </ReCaptchaProvider>
    </>
  );
}
