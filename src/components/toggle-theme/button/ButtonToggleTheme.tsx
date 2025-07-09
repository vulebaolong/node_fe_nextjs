"use client";

import { ActionIcon, ActionIconProps, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

type TProps = {
   size?: ActionIconProps["size"];
}

export default function ButtonToggleTheme({ size = "lg" }: TProps) {
   const { toggleColorScheme } = useMantineColorScheme();

   return (
      <>
         <ActionIcon onClick={toggleColorScheme} variant="default" size={size} lightHidden>
            <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
         </ActionIcon>
         <ActionIcon onClick={toggleColorScheme} variant="default" size={size} darkHidden>
            <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
         </ActionIcon>
      </>
   );
}
