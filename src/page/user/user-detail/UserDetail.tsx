"use client";

import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import Paper from "@/components/custom/paper/PaperCustom";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { addChatOpened, emitToEvent } from "@/helpers/chat.helper";
import { resError } from "@/helpers/function.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useDetailUser } from "@/api/tantask/user.tanstack";
import { TSocketRes } from "@/types/base.type";
import { TCreateRoomReq, TCreateRoomRes } from "@/types/chat.type";
import { Box, Button, Center, Container, Group, Stack, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserDetail() {
   const { id } = useParams<{ id: string }>();
   const info = useAppSelector((state) => state.user.info);
   const { socket } = useSocket();
   const [loading, setLoading] = useState(false);

   const queryClient = useQueryClient();
   const detailUser = useDetailUser(id || `0`);

   const handleChat = () => {
      if (!info?._id || !detailUser.data?._id || !socket) return;
      setLoading(true);

      const payload: TCreateRoomReq = { ownerId: info?._id, targetUserIds: [detailUser.data?._id] };

      emitToEvent(socket, SOCKET_CHAT_MES.CREATE_ROOM, payload, (data: TSocketRes<TCreateRoomRes>) => {
         try {
            console.log({ CREATE_ROOM: { info, detailUser: detailUser.data, data } });
            if (data.status === "error") throw new Error(data.message);
            if (!data.data.chatGroupId) throw new Error("Be not response chatGroupId");

            addChatOpened(
               {
                  chatGroupId: data.data?.chatGroupId,
                  chatGroupName: "",
                  chatGroupMembers: [
                     {
                        avatar: detailUser.data?.avatar,
                        fullName: detailUser.data?.fullName,
                        roleId: detailUser.data?.roleId,
                        userId: detailUser.data?._id,
                     },
                     {
                        avatar: info?.avatar,
                        fullName: info?.fullName,
                        roleId: info?.roleId,
                        userId: info?._id,
                     },
                  ],
               },
               () => {
                  queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
                  queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
               }
            );
         } catch (error) {
            console.log(error);
            toast.error(resError(error, "Create Room Failed"));
         } finally {
            setLoading(false);
         }
      });
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
                        <Avatar avatar={detailUser.data?.avatar} fullName={detailUser.data?.fullName} size={120} radius={120} mx="auto" />
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
