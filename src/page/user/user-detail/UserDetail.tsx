"use client";

import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import Paper from "@/components/custom/paper/PaperCustom";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { addUserToChatList, emitToEvent, listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useDetailUser } from "@/tantask/user.tanstack";
import { TUser } from "@/types/user.type";
import { Box, Button, Center, Container, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail() {
   const { id } = useParams<{ id: string }>();
   const info = useAppSelector((state) => state.user.info);
   const { socket } = useSocket();
   const [chatGroupId, setChatGroupId] = useState<number | null>(null);

   const queryClient = useQueryClient();
   const detailUser = useDetailUser(id || `0`);

   useEffect(() => {
      if (!socket) return;
      listenToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM_FIRST, (data: { userRecipient: TUser; chatGroupId: number }) => {
         console.log({ JOIN_ROOM_FIRST: data });
         addUserToChatList(
            { ava: data.userRecipient.avatar, id: data.userRecipient.id, name: data.userRecipient.fullName, roleId: data.userRecipient.roleId, chatGroupId: data.chatGroupId },
            () => {
               queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
               queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
            }
         );
      });
   }, [socket]);

   useEffect(() => {
      return () => {
         if (!socket) return;
         removeEventListener(socket, SOCKET_CHAT_MES.JOIN_ROOM_FIRST);
      };
   }, []);

   useEffect(() => {
      if (!info?.id || !detailUser.data?.id || !chatGroupId) return;
   }, [chatGroupId]);

   const handleChat = () => {
      if (!info?.id || !detailUser.data?.id || !socket) return;

      emitToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM_FIRST, { userIdSender: info.id, userIdRecipient: detailUser.data.id, userRecipient: detailUser.data });

      console.log({
         id1: info?.id,
         id2: detailUser.data?.id,
      });
   };

   return (
      <>
         <Container py={100}>
            <Stack>
               <Paper shadow="lg" radius="lg" withBorder p={80} pt={100} bg="var(--mantine-color-body)">
                  <Stack>
                     <Center>
                        <Avatar user={detailUser.data} size={120} radius={120} mx="auto" />
                     </Center>

                     <Box>
                        <Text ta="center" fz="lg" fw={500} mt="md">
                           {detailUser.data?.fullName}
                        </Text>

                        <Text ta="center" c="dimmed" fz="sm">
                           {detailUser.data?.email}
                        </Text>

                        <Center mt={10}>
                           <Badge user={detailUser.data} />
                        </Center>
                     </Box>
                     <Center>
                        <Group>
                           <Button>Kết bạn</Button>
                           <Button onClick={handleChat} variant="default">
                              Nhắn tin
                           </Button>
                        </Group>
                     </Center>
                  </Stack>
               </Paper>
            </Stack>
         </Container>
      </>
   );
}
