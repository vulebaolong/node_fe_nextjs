"use client";

import { useGetInfo } from "@/tantask/auth.tanstack";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type TProps = {
   children: React.ReactNode;
   protect?: boolean;
};

export default function RootPage({ children, protect = false }: TProps) {
   console.log(`RootPage`);
   const pathname = usePathname();
   const getInfo = useGetInfo();

   useEffect(() => {
      if (protect) {
         getInfo.mutate();
      }
   }, [pathname]);

   return <div>{children}</div>;
}
