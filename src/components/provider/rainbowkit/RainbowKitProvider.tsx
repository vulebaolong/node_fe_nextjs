"use client";

import { NEXT_PUBLIC_IS_PRODUCTION } from "@/constant/app.constant";
import { useMantineColorScheme } from "@mantine/core";
import { darkTheme, getDefaultConfig, lightTheme, RainbowKitProvider as RainbowKit } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

const config = getDefaultConfig({
   appName: "My RainbowKit App",
   projectId: "2168859ba501fe336dc80f0a435fb7b8",
   chains: NEXT_PUBLIC_IS_PRODUCTION ? [arbitrum] : [arbitrumSepolia],
   ssr: true,
});

export default function RainbowKitProvider({ children }: { children: React.ReactNode }) {
   const { colorScheme } = useMantineColorScheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   const theme = colorScheme === "dark" ? darkTheme() : lightTheme();

   return (
      <WagmiProvider config={config}>
         <RainbowKit theme={theme}>{children}</RainbowKit>
      </WagmiProvider>
   );
}
