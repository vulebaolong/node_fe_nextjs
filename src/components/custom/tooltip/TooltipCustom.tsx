"use client";

import { Tooltip, TooltipProps } from "@mantine/core";
import { ReactNode } from "react";

type TooltipCustomProps = TooltipProps & {
   children: ReactNode;
};

export default function TooltipCustom({ children, ...props }: TooltipCustomProps) {
   return (
      <Tooltip withArrow transitionProps={{ transition: "scale", duration: 300 }} {...props}>
         {children}
      </Tooltip>
   );
}
