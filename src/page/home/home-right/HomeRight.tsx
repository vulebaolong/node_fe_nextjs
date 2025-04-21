"use client";

import TagUser from "@/components/tag-user/TagUser";
import { addUserToChatList, listenToEvent } from "@/helpers/chat.helper";
import { useAppSelector } from "@/redux/hooks";
import { useFindAllUser } from "@/tantask/user.tanstack";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import classes from "./HomeRight.module.css";
import { useTranslations } from "next-intl";
import { useSocket } from "@/hooks/socket.hook";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";

export default function HomeRight() {
   const t = useTranslations(`home-right`);
   const findAllUser = useFindAllUser();
   const userId = useAppSelector((state) => state.user.info?.id);
   const queryClient = useQueryClient();
   const [listIdUserNoti, setListIdUserNoti] = useState<number[]>([]);

   const handleClickUser = (user: TUser) => {
      addUserToChatList({ ava: user.avatar, id: user.id, name: user.fullName, roleId: user.roleId }, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
      });
   };

   const { socket } = useSocket();

   useEffect(() => {
      if (socket) {
         listenToEvent(socket, SOCKET_CHAT_MES.NOTI_MESSAGE, (data) => {
            console.log({ data });
            setListIdUserNoti((prev) => {
               return [...prev, data.payload.userIdSender];
            });
            queryClient.invalidateQueries({ queryKey: ["user-list"] });
         });
      }
   }, [socket]);

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
            <Stack className={`${classes[`box-1`]}`}>
               {findAllUser.data?.items?.map((user, i) => {
                  if (user.id === userId) return <Fragment key={i}></Fragment>;
                  return (
                     <Box
                        key={i}
                        onClick={() => {
                           handleClickUser(user);
                        }}
                        style={{ cursor: "pointer" }}
                     >
                        <TagUser user={user} fw={listIdUserNoti.includes(user.id) ? `bold` : `normal`} />
                     </Box>
                  );
               })}
            </Stack>
         </Stack>
      </>
   );
}
