"use client";

import { useAppSelector } from "@/redux/hooks";
import { Menu, Stack } from "@mantine/core";
import Avatar from "../avatar/Avatar";
import UserAction from "../user-action/UserAction";
import UserMenu from "../user-menu/UserMenu";

export default function UserControl() {
   const info = useAppSelector((state) => state.user.info);

   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>
            <Avatar style={{ cursor: `pointer` }} user={info} iconChevronDown={true} />
         </Menu.Target>

         <Menu.Dropdown>
            <Stack p={5}>
               <UserMenu textAlign="left" />

               <Menu.Divider />

               <UserAction textAlign="left" />
            </Stack>
         </Menu.Dropdown>
      </Menu>
   );
}
