"use client";

import { Box } from "@mantine/core";
import HomeCenter from "./home-center/HomeCenter";
import HomeLeft from "./home-left/HomeLeft";
import HomeRight from "./home-right/HomeRight";

export default function Home() {
   return (
      <Box
         sx={(_, u) => {
            return {
               display: "grid",
               [u.largerThan("md")]: {
                  gridTemplateColumns: "250px 1fr 250px",
               },
               [u.smallerThan("md")]: {
                  gridTemplateColumns: "1fr",
               },
               gap: 20,
               height: "calc(100dvh - var(--height-header))",
               padding: "20px",
            };
         }}
      >
         <Box
            sx={(_, u) => {
               return {
                  height: "calc(100dvh - var(--height-header))",
                  [u.smallerThan("md")]: {
                     display: "none",
                  },
                  [u.largerThan("md")]: {
                     display: "block",
                  },
               };
            }}
         >
            <HomeLeft />
         </Box>

         <Box
            sx={{
               height: "calc(100dvh - var(--height-header))",
               overflowY: "auto",
               // scrollbarWidth: "none",
               // '&::-webkit-scrollbar': {
               //    display: "none",
               // },
            }}
         >
            <HomeCenter />
         </Box>

         <Box
            sx={(_, u) => {
               return {
                  height: "calc(100dvh - var(--height-header))",
                  [u.smallerThan("md")]: {
                     display: "none",
                  },
                  [u.largerThan("md")]: {
                     display: "block",
                  },
               };
            }}
         >
            <HomeRight />
         </Box>
      </Box>
   );
}
