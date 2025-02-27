import { Box, Center, Group, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import SwitchLang from "../switch-lang/SwitchLang";
import classes from "./Test.module.css";
import ButtonToggleTheme from "../toggle-theme/button/ButtonToggleTheme";
import SwitchToggleTheme from "../toggle-theme/switch/SwitchToggleTheme";

export default function Test() {
   const t = useTranslations();

   return (
      <Box>
         <Text className={`${classes[`box-1`]}`}>123</Text>
         <Center>
            <Group>
               <SwitchLang />
               <Text>{t("test.hello")}</Text>
            </Group>
         </Center>
         <Center>
            <Group>
               <ButtonToggleTheme />
               <SwitchToggleTheme />
            </Group>
         </Center>
      </Box>
   );
}
