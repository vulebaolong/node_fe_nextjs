"use client";

import useRouter from "@/hooks/use-router-custom";
import { useAppSelector } from "@/redux/hooks";
import { useGetInfoMutation } from "@/api/tantask/auth.tanstack";
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";

type TProps = {
   children: React.ReactNode;
   protect?: boolean;
};

export default function Template({ children, protect = false }: TProps) {
   const router = useRouter();
   const getInfo = useGetInfoMutation();
   const [allowRender, setAllowRender] = useState(!protect);
   const loadingPage = useAppSelector((state) => state.setting.loadingPage);

   useEffect(() => {
      if (!protect) return;
      getInfo.mutate(undefined, {
         onSuccess: () => {
            setAllowRender(true);
         },
         onError: () => {
            setAllowRender(false);
            router.push("/login");
         },
      });
   }, []);

   return (
      <>
         {allowRender && children}
         <Loader
            size={"sm"}
            style={{
               position: "fixed",
               zIndex: 99999,
               visibility: loadingPage || getInfo.isPending || !allowRender ? "visible" : "hidden",
               bottom: "20px",
               left: "20px",
               scroll: "unset",
            }}
         />
      </>
   );
}
