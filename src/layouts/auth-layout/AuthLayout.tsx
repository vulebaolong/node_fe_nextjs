import ThreeBackgroundParticle from "@/components/three-background/ThreeBackgroundParticle";
import { Stack } from "@mantine/core";
import { ReactNode } from "react";

type TProps = {
   children: ReactNode;
};

export default function AuthLayout({ children }: TProps) {
   return (
      <Stack
         sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
         }}
      >
         <ThreeBackgroundParticle />
         {children}
      </Stack>
   );
}
