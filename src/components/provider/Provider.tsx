"use client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "../../styles/animation.css";
import "../../styles/global.css";

import { useHotkeys } from "@mantine/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { ReactNode } from "react";
import GoogleProvider from "./google/GoogleProvider";
import { resolver, themeOverride } from "./mantine/theme";
import ProviderRedux from "./redux/ProviderRedux";
import SocketProvider from "./socket/SocketProvider";
import { RootStoreProvider } from "./stores/RootStoreProvider";
import ToastProvider from "./toast/ToastProvider";
import RainbowKitProvider from "./rainbowkit/RainbowKitProvider";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: false,
         gcTime: 0,
         staleTime: 0,
      },
   },
});

export default function Provider({ children }: { children: ReactNode }) {
   useHotkeys([["mod+.", () => process.env.NEXT_PUBLIC_IS_PRODUCTION !== `true` && window.open("/test", "_blank")]]);

   return (
      <QueryClientProvider client={queryClient}>
         <RootStoreProvider>
            <ProviderRedux>
               <MantineProvider theme={themeOverride} defaultColorScheme="dark" cssVariablesResolver={resolver}>
                  <ToastProvider />
                  <SocketProvider>
                     <GoogleProvider>
                        <RainbowKitProvider>{children}</RainbowKitProvider>
                     </GoogleProvider>
                  </SocketProvider>
               </MantineProvider>
            </ProviderRedux>
         </RootStoreProvider>
      </QueryClientProvider>
   );
}
