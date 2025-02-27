"use client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../../styles/animation.css";
import "../../styles/global.css";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { ReactNode } from "react";
import { resolver, themeOverride } from "./mantine/theme";
import ProviderRedux from "./redux/ProviderRedux";
import ToastProvider from "./toast/ToastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
   return (
      <QueryClientProvider client={queryClient}>
         <ProviderRedux>
            <MantineProvider theme={themeOverride} defaultColorScheme="dark" cssVariablesResolver={resolver}>
               <ToastProvider />
               {children}
            </MantineProvider>
         </ProviderRedux>
      </QueryClientProvider>
   );
}
