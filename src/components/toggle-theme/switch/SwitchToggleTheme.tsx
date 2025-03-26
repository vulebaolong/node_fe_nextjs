"use client";

import { rem, Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function SwitchToggleTheme() {
   const theme = useMantineTheme();
   const { toggleColorScheme, colorScheme } = useMantineColorScheme();
   const [checked, setChecked] = useState(false);
   const [hasMounted, setHasMounted] = useState(false);

   useEffect(() => {
      setChecked(colorScheme !== "light");
      setHasMounted(true);
   }, [colorScheme]);

   const handleToggleTheme = () => {
      toggleColorScheme();
   };

   const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;

   const moonIcon = <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />;

   if (!hasMounted) return null;

   return (
      <Switch
         onChange={handleToggleTheme}
         checked={checked}
         size="md"
         color="dark.4"
         onLabel={moonIcon}
         offLabel={sunIcon}
         styles={{
            track: {
               cursor: `pointer`,
            },
         }}
      />
   );
}
