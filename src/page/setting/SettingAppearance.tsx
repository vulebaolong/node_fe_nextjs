"use client";

import Paper from "@/components/custom/paper/PaperCustom";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Divider, Group, MantineColorScheme, Select, Stack, Title, useMantineColorScheme } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";

export default function SettingAppearance() {
   const { colorScheme, setColorScheme } = useMantineColorScheme();

   const t = useTranslations("setting");
   const locale = useLocale();

   const handleLanguageChange = (localeSelect: Locale): void => {
      if (locale === localeSelect) return;
      setUserLocale(localeSelect);
   };
   return (
      <>
         <Title
            order={2}
            mt="sm"
            sx={{
               fontWeight: 900,
               fontSize: `clamp(20px, 3vw, 28px)`,
            }}
         >
            {t(`Appearance`)}
         </Title>

         <Paper shadow="sm">
            <Stack>
               <Group sx={{ width: `100%`, justifyContent: `space-between` }}>
                  <Title
                     order={2}
                     mt="sm"
                     sx={{
                        fontWeight: 900,
                        fontSize: `clamp(14px, 2vw, 18px)`,
                     }}
                  >
                     {t(`Display mode`)}
                  </Title>

                  <Select
                     radius={"lg"}
                     value={colorScheme}
                     onChange={(value) => value && setColorScheme(value as MantineColorScheme)}
                     data={[
                        { value: "light", label: t(`Light`) },
                        { value: "dark", label: t(`Dark`) },
                     ]}
                  />
               </Group>

               <Divider />

               <Group sx={{ width: `100%`, justifyContent: `space-between` }}>
                  <Title
                     order={2}
                     mt="sm"
                     sx={{
                        fontWeight: 900,
                        fontSize: `clamp(14px, 2vw, 18px)`,
                     }}
                  >
                     {t(`Display language`)}
                  </Title>

                  <Select
                     radius="lg"
                     value={locale}
                     onChange={(value) => value && handleLanguageChange(value as "vi" | "en")}
                     data={[
                        { value: "vi", label: t(`vi`) },
                        { value: "en", label: t(`en`) },
                     ]}
                  />
               </Group>
            </Stack>
         </Paper>
      </>
   );
}
