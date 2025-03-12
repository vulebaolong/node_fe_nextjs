import { Center, Group, Text } from "@mantine/core";
import SwitchLang from "../switch-lang/SwitchLang";
import { useTranslations } from "next-intl";

export default function SwitchLanguage() {
   const t = useTranslations(`test`);

   return (
      <Center>
         <Group>
            <SwitchLang />
            <Text>{t("hello")}</Text>
         </Group>
      </Center>
   );
}
