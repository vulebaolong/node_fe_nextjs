"use client";

import ChatContainer from "@/components/chat/chat-container/ChatContainer";
import { useSocket } from "@/components/provider/socket/SocketProvider";
import TagUser from "@/components/tag-user/TagUser";
import { CHAT_LIST_ID } from "@/constant/chat.constant";
import { useAppSelector } from "@/redux/hooks";
import { useFindAllUser } from "@/tantask/user.tanstack";
import { TChatListItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { Fragment } from "react";
import classes from './HomeRight.module.css'

export default function HomeRight() {
   const { socket, isConnected } = useSocket();
   const findAllUser = useFindAllUser();
   const userId = useAppSelector((state) => state.user.info?.id);
   const queryClient = useQueryClient();

   const handleClickUser = (user: TUser) => {
      const stringLocal = localStorage.getItem(CHAT_LIST_ID);
      const listChatLocal = stringLocal ? JSON.parse(stringLocal) : [];

      if (_.isArray(listChatLocal)) {
         const isPush = listChatLocal.find((item: TChatListItem) => {
            return item.id === user.id;
         });
         if (isPush === undefined) {
            listChatLocal.unshift({ id: user.id, name: user.fullName, ava: user.avatar });
            localStorage.setItem(CHAT_LIST_ID, JSON.stringify(listChatLocal));
            queryClient.invalidateQueries({ queryKey: [`chat-list-id`] });
         }
      }

      // socket?.emit("join-room", { userIdSender: userId, userIdRecipient: user.id });
   };
   return (
      <>
         <Stack style={{ height: `100%` }}>
            <Text>{isConnected ? `Connected` : `not Connected`}</Text>
            <Group justify="space-between">
               <Text opacity={0.7} fw={`bold`} fz={`lg`}>
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
         <ChatContainer />
      </>
   );
}
