"use client";

import GlowCard from "@/components/card/GlowCard";
import ColorThemeSelector from "@/components/color-selector/ColorSchemeSelector";
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

         <Paper shadow="sm" p={0}>
            <GlowCard width={`100%`} height={`100%`} glowWidth={`100%`} glowHeight={`200%`} borderRadius={"0px"} blurAmount={20}>
               <Stack p={`xl`}>
                  <Group sx={{ width: `100%`, justifyContent: `space-between` }}>
                     <Title
                        order={2}
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
                        {t(`Color Themes`)}
                     </Title>

                     <ColorThemeSelector />
                  </Group>
               </Stack>
            </GlowCard>
         </Paper>
      </>
   );
}
