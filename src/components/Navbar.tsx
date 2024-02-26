"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import LotteryDialog from "../components/LotteryDialog";
import { AppBar } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const [isScrolling] = useState(false);

  const navBarStyle =
    "text-2xl p-4 text-dark-blue hover:border-b-4 font-bold";

  // Render Navbar
  return (
      <AppBar 
        position="static"
        className={`bg-white shadow-lg py-4 px-4 lg:px-12 text-gray-900`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Image src="/logo.png" alt="Lottery Logo" width={300} height={200} />
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
      </AppBar>
  );
}

export default Navbar;
