"use client";

import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import Paper from "@/components/custom/paper/PaperCustom";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { addChatOpened, emitToEvent, listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useDetailUser } from "@/tantask/user.tanstack";
import { Box, Button, Center, Container, Group, Stack, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserDetail() {
   const { id } = useParams<{ id: string }>();
   const info = useAppSelector((state) => state.user.info);
   const { socket } = useSocket();
   const [loading, setLoading] = useState(false)

   const queryClient = useQueryClient();
   const detailUser = useDetailUser(id || `0`);

   useEffect(() => {
      if (!socket || !info?.id || !detailUser.data?.id) return;
      listenToEvent(socket, SOCKET_CHAT_MES.CREATE_ROOM, (data: { chatGroupId: number }) => {
         console.log({ CREATE_ROOM: { info, detailUser: detailUser.data } });
         setLoading(false);
         addChatOpened(
            {
               chatGroupId: data.chatGroupId,
               chatGroupName: ``,
               chatGroupMembers: [
                  {
                     avatar: detailUser.data?.avatar,
                     fullName: detailUser.data?.fullName,
                     roleId: detailUser.data?.roleId,
                     userId: detailUser.data?.id,
                  },
                  {
                     avatar: info?.avatar,
                     fullName: info?.fullName,
                     roleId: info?.roleId,
                     userId: info?.id,
                  },
               ],
            },
            () => {
               queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
               queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
            }
         );
      });

      return () => {
         if (!socket || !info?.id || !detailUser.data?.id) return;
         removeEventListener(socket, SOCKET_CHAT_MES.CREATE_ROOM);
      };
   }, [socket, info, detailUser.data]);

   const handleChat = () => {
      if (!info?.id || !detailUser.data?.id || !socket) return;

      const payload = { ownerId: info?.id, targetUserIds: [detailUser.data?.id] };

      emitToEvent(socket, SOCKET_CHAT_MES.CREATE_ROOM, payload);

      setLoading(true);
   };

   const handleMakeFriend = () => {
      toast.info("Tính năng đang được phát triển");
   };

   return (
      <>
         <Container py={100}>
            <Stack>
               <Paper shadow="lg" radius="lg" withBorder p={80} pt={100} bg="var(--mantine-color-body)">
                  <Stack>
                     <Center>
                        <Avatar
                           avatar={detailUser.data?.avatar}
                           fullName={detailUser.data?.fullName}
                           size={120}
                           radius={120}
                           mx="auto"
                        />
                     </Center>

                     <Box>
                        <Center>
                           <Text truncate maw={300} fz="lg" fw={500} mt="md">
                              {detailUser.data?.fullName}
                           </Text>
                        </Center>

                        <Text ta="center" c="dimmed" fz="sm">
                           {detailUser.data?.email}
                        </Text>

                        <Center mt={10}>
                           <Badge user={detailUser.data} />
                        </Center>
                     </Box>
                     <Center>
                        <Group>
                           <Button onClick={handleMakeFriend}>Kết bạn</Button>
                           <Button loading={loading} onClick={handleChat} variant="default">
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
