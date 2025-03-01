"use client";

import { useSocket } from "@/components/provider/socket/SocketProvider";
import TagUser from "@/components/tag-user/TagUser";
import { addUserToChatList } from "@/helpers/chat.helper";
import { useAppSelector } from "@/redux/hooks";
import { useFindAllUser } from "@/tantask/user.tanstack";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import classes from "./HomeRight.module.css";

export default function HomeRight() {
   const { socket, isConnected } = useSocket();
   const findAllUser = useFindAllUser();
   const userId = useAppSelector((state) => state.user.info?.id);
   const queryClient = useQueryClient();

   const handleClickUser = (user: TUser) => {
      addUserToChatList({ ava: user.avatar, id: user.id, name: user.fullName, roleId: user.roleId }, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
      });
   };

   return (
      <>
         <Stack style={{ height: `100%` }}>
            {/* <Text>{isConnected ? `Con: ${socket?.id}` : `not Connected`}</Text> */}
            <Group justify="space-between">
               <Text opacity={0.7} fw={`bold`} fz={`md`}>
                  Người Liên Hệ
               </Text>
               <ActionIcon variant="subtle" radius="xl">
                  <IconSearch style={{ width: "70%", height: "70%" }} stroke={1.5} />
               </ActionIcon>
            </Group>
            <Stack className={`${classes[`box-1`]}`}>
               {findAllUser.data?.items.map((user, i) => {
                  if (user.id === userId) return <Fragment key={i}></Fragment>;
                  return (
                     <Box
                        key={i}
                        onClick={() => {
                           handleClickUser(user);
                        }}
                        style={{ cursor: "pointer" }}
                     >
                        <TagUser user={user} />
                     </Box>
                  );
               })}
            </Stack>
         </Stack>
      </>
   );
}
