import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Layout } from "@/components/WagmiLayout";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lottery Draws",
  description: "A simple lottery draw app with fixed and public randomness.",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <body className={roboto.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
