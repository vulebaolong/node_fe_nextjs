"use client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../../styles/animation.css";
import "../../styles/global.css";

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
import ToastProvider from "./toast/ToastProvider";
import { RootStoreProvider } from "./stores/RootStoreProvider";
import { useHotkeys } from "@mantine/hooks";

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
   useHotkeys([["mod+.", () => process.env.NEXT_PUBLIC_IS_PRODUCTION === `false` && window.open("/test", "_blank")]]);

   return (
      <QueryClientProvider client={queryClient}>
         <RootStoreProvider>
            <ProviderRedux>
               <MantineProvider theme={themeOverride} defaultColorScheme="dark" cssVariablesResolver={resolver}>
                  <ToastProvider />
                  <SocketProvider>
                     <GoogleProvider>{children}</GoogleProvider>
                  </SocketProvider>
               </MantineProvider>
            </ProviderRedux>
         </RootStoreProvider>
      </QueryClientProvider>
   );
}
