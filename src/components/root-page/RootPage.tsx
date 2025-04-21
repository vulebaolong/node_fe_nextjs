"use client";

import { useGetInfo } from "@/tantask/auth.tanstack";
import { Center, Loader } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TProps = {
   children: React.ReactNode;
   protect?: boolean;
};

export default function RootPage({ children, protect = false }: TProps) {
   const pathname = usePathname();
   const router = useRouter();
   const getInfo = useGetInfo();
   const [allowRender, setAllowRender] = useState(!protect);

   useEffect(() => {
      if (!protect) return;

      getInfo.mutate(undefined, {
         onSuccess: () => {
            setAllowRender(true);
         },
         onError: () => {
            router.push("/login");
         },
      });
   }, [pathname]);

   if (!allowRender)
      return (
         <Center h={`100vh`} w={`100%`}>
            <Loader />
         </Center>
      );

   return <>{children}</>;
}
