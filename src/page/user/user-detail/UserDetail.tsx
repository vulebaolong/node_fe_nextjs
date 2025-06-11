"use client";

import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import Paper from "@/components/custom/paper/PaperCustom";
import { addUserToChatList } from "@/helpers/chat.helper";
import { useAppSelector } from "@/redux/hooks";
import { useDetailUser } from "@/tantask/user.tanstack";
import { Box, Button, Center, Container, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function UserDetail() {
   const { id } = useParams<{ id: string }>();
   const info = useAppSelector((state) => state.user.info);
   const [opened, handleOpenChat] = useDisclosure();
   const queryClient = useQueryClient();

   const detailUser = useDetailUser(id || `0`);

   const handleChat = () => {
      if (!info?.id || !detailUser.data?.id) return;
      handleOpenChat.open();

      addUserToChatList({ ava: detailUser.data.avatar, id: detailUser.data.id, name: detailUser.data.fullName, roleId: detailUser.data.roleId }, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
      });
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
         {/* {opened && detailUser.data && (
            <ChatUserItem
               item={{
                  ava: detailUser.data?.avatar,
                  id: detailUser.data?.id,
                  name: detailUser.data?.fullName,
                  roleId: detailUser.data.roleId,
               }}
               i={0}
            />
         )} */}
      </>
   );
}
