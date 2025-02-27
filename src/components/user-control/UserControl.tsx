"use client";

import ROUTER from "@/constant/router.constant";
import { logout } from "@/helpers/api.helper";
import { effectText } from "@/helpers/motion.helper";
import { useAppSelector } from "@/redux/hooks";
import { Box, Group, Menu, Text } from "@mantine/core";
import { IconLogout, IconSettings, IconUserSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Avatar from "../avatar/Avatar";
import classes from "./UserControl.module.css";
import Badge from "../badge/Badge";

export default function UserControl() {
   const router = useRouter();
   const info = useAppSelector((state) => state.user.info);

   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>{<Avatar style={{ cursor: `pointer` }} user={info} />}</Menu.Target>

         <Menu.Dropdown>
            <Box className={classes.textAvatar}>
               <Badge user={info} w={`100%`} />
            </Box>

            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs" component="div">
                  {effectText(`Name`)}
               </Text>
               <Text component="span" size="xs" truncate="end">
                  {info?.fullName}
               </Text>
            </Group>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs" component="div">
                  {effectText(`Email`)}
               </Text>
               <Text span size="xs" truncate="end">
                  {info?.email}
               </Text>
            </Group>

            <Menu.Divider />

            <Menu.Label>Application</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item
               onClick={() => {
                  router.push(ROUTER.PROFILE);
               }}
               leftSection={<IconUserSearch size={14} />}
            >
               Profile
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
               onClick={() => {
                  logout();
               }}
               color="red"
               leftSection={<IconLogout size={14} />}
            >
               Logout
            </Menu.Item>
         </Menu.Dropdown>
      </Menu>
   );
}
