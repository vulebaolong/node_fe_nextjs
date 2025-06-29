"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { ActionIcon, ActionIconProps, Menu } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

type TProps = {
   size?: ActionIconProps["size"];
}

export default function SwitchLang( { size = "lg" }: TProps) {
   const t = useTranslations("localeSwitcher");
   const locale = useLocale();

   const handleLanguageChange = (localeSelect: Locale): void => {
      if (locale === localeSelect) return;
      setUserLocale(localeSelect);
   };

   return (
      <Menu shadow="md" width={110}>
         <Menu.Target>
            <ActionIcon variant="default" size={size}>
               <IconLanguage style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Item
               onClick={() => {
                  handleLanguageChange("vi");
               }}
            >
               {t(`vi`)}
            </Menu.Item>
            <Menu.Item
               onClick={() => {
                  handleLanguageChange("en");
               }}
            >
               {t(`en`)}
            </Menu.Item>
         </Menu.Dropdown>
      </Menu>
   );
}
