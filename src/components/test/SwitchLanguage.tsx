import { Center, Group, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import SwitchLang from "../switch-lang/SwitchLang";

export default function SwitchLanguage() {
   const t = useTranslations(`test`);

   return (
      <Center>
         <Group w={200}>
            <SwitchLang />
            <Text>{t("hello")}</Text>
         </Group>
      </Center>
   );
}
