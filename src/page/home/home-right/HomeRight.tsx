"use client";

import TagUser from "@/components/tag-user/TagUser";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { addUserToChatList, emitToEvent, listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { animationList } from "@/helpers/function.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useFindAllChatGroup } from "@/tantask/user.tanstack";
import { ChatGroup } from "@/types/chat-group.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";

export default function HomeRight() {
   const t = useTranslations(`home-right`);
   const userId = useAppSelector((state) => state.user.info?.id);
   const { socket } = useSocket();

   const [listIdUserNoti, _] = useState<number[]>([]);

   const findAllChatGroup = useFindAllChatGroup();
   const queryClient = useQueryClient();

  

   const handleClickUser = (user: TUser, chatGroup: ChatGroup) => {
      // if (!socket || !userId) return;

      addUserToChatList(
         {
            ava: user.avatar,
            id: user.id,
            name: user.fullName,
            roleId: user.roleId,
            chatGroupId: chatGroup.id,
         },
         () => {
            queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
            queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
         }
      );
   };

   return (
      <>
         <Stack style={{ height: `100%` }}>
            <Group justify="space-between">
               <Text opacity={0.7} fw={`bold`} fz={`md`}>
                  {t(`Contact person`)}
               </Text>
               <ActionIcon variant="subtle" radius="xl">
                  <IconSearch style={{ width: "70%", height: "70%" }} stroke={1.5} />
               </ActionIcon>
            </Group>
            <Stack
               sx={{
                  overflow: "auto",
                  height: `100%`,
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                     display: "none",
                  },
               }}
            >
               {(findAllChatGroup.data?.items || []).map((chatGroup, i) => {
                  const user = (chatGroup?.ChatGroupMembers || []).find((user) => user.userId !== userId);
                  if (!user) return;
                  if (user.id === userId) return <Fragment key={i}></Fragment>;
                  return (
                     <Box
                        key={i}
                        onClick={() => {
                           handleClickUser(user.Users, chatGroup);
                        }}
                        style={{ cursor: "pointer", ...animationList(i) }}
                     >
                        <TagUser user={user.Users} fw={listIdUserNoti.includes(user.id) ? `bold` : `normal`} />
                     </Box>
                  );
               })}
            </Stack>
         </Stack>
      </>
   );
}
