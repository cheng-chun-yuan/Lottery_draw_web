"use client";

import { ThemeProvider } from "@material-tailwind/react";
import { ParticleNetwork } from "@particle-network/auth";
import { particleWallet } from "@particle-network/rainbowkit-ext";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import Navbar from "./Navbar";

new ParticleNetwork({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
  appId: process.env.NEXT_PUBLIC_APP_ID as string,
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [avalanche, avalancheFuji],
  [publicProvider()],
);

const particleWallets = [
  particleWallet({ chains, authType: "google" }),
  particleWallet({ chains, authType: "facebook" }),
  particleWallet({ chains, authType: "apple" }),
  particleWallet({ chains }),
];

const popularWallets = {
  groupName: "Popular",
  wallets: [
    ...particleWallets,
    rainbowWallet({
      chains,
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }),
    metaMaskWallet({
      chains,
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }),
    walletConnectWallet({
      chains,
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }),
  ],
};

const connectors = connectorsForWallets([
  popularWallets,
  {
    groupName: "Other",
    wallets: [
      trustWallet({
        chains,
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
      }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
    },
  },
});
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode>
          <ThemeProvider>
            <div className="fixed left-0 right-0 top-0 z-50">
              {" "}
              {/* Adjust z-index as needed */}
              <Navbar />
            </div>
            <div className="pt-48">
              {" "}
              {/* Adjust padding-top based on Navbar's height */}
              {children}
            </div>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default Layout;
