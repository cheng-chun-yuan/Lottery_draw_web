"use client";

import { useState } from "react";
import LotteryDialog from "../components/LotteryDialog";
import Image from "next/image";
import Link from "next/link";

import { Navbar as MTNavbar } from "@material-tailwind/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const [isScrolling] = useState(false);

  const navBarStyle =
    "text-2xl p-4 hover:text-dark-blue hover:border-b-4 font-bold";

  // Render Navbar
  return (
    <>
      <MTNavbar
        fullWidth
        shadow={false}
        blurred={false}
        color={isScrolling ? "white" : "transparent"}
        className="text-black fixed top-0 z-50 border-0 bg-opacity-80 backdrop-blur-xl"
        placeholder={undefined}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Image src="/logo.png" alt="Lottery Logo" width={440} height={160} />
          <ul
            className={`ml-10 hidden items-center gap-6 lg:flex ${
              isScrolling ? "text-gray-900" : "text-black"
            }`}
          >
            <Link href="/Lotterys" className={navBarStyle}>
              All Lotterys
            </Link>
            <LotteryDialog />
          </ul>
          <div className="flex flex-row space-x-8">
            <ConnectButton />
          </div>
        </div>
      </MTNavbar>
    </>
  );
}

export default Navbar;
