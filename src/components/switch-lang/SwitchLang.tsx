"use client";

import { ActionIcon, Menu } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export default function SwitchLang() {
   const pathName = usePathname();
   const router = useRouter();

   const handleLanguageChange = (locale: string): void => {
      const path = pathName.split("/").slice(2).join("/");
      router.push(`/${locale}/${path}`);
   };

   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>
            <ActionIcon variant="default" size="lg">
               <IconWorld stroke={1.5} size={20} />
            </ActionIcon>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Item
               onClick={() => {
                  handleLanguageChange("vi");
               }}
            >
               VN
            </Menu.Item>
            <Menu.Item
               onClick={() => {
                  handleLanguageChange("en");
               }}
            >
               EN
            </Menu.Item>
         </Menu.Dropdown>
      </Menu>
   );
}
