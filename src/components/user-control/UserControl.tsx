"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetInfoQuery } from "@/tantask/auth.tanstack";
import { Group, Menu, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import UserMenuLoginNo from "../user-menu/UserMenuLoginNo";
import UserMenuLoginYes from "../user-menu/UserMenuLoginYes";
import Avatar from "../avatar/Avatar";

type TProps = {
   colorText?: string;
};

export default function UserControl({ colorText = "black" }: TProps) {
   useGetInfoQuery();
   const info = useAppSelector((state) => state.user.info);
   const [opened, setOpened] = useState(false);

   return (
      <Menu shadow="md" width={220} opened={opened} onChange={setOpened}>
         <Menu.Target>
            {info ? (
               <Avatar size={32} sx={{ cursor: `pointer` }} fullName={info.fullName} avatar={info.avatar} color="initials" />
            ) : (
               <Group
                  gap={2}
                  sx={(theme, u) => ({
                     cursor: "pointer",
                     transition: "color 150ms ease",
                     [u.light]: {
                        color: colorText,
                     },
                     [u.dark]: {
                        color: "white",
                     },
                     "&:hover": {
                        color: theme.colors[theme.primaryColor][5],
                     },
                  })}
               >
                  <IconUser size={16} stroke={1} />
                  <Text style={{ fontWeight: 400, fontSize: `14px` }}>Tài khoản</Text>
               </Group>
            )}
         </Menu.Target>

         <Menu.Dropdown sx={{ borderRadius: `16px`, padding: `8px` }}>
            {info ? <UserMenuLoginYes onClick={() => setOpened(false)} /> : <UserMenuLoginNo onClick={() => setOpened(false)} />}
         </Menu.Dropdown>
      </Menu>
   );
}
