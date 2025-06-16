"use client";

import Avatar from "@/components/avatar/Avatar";
import TagUser from "@/components/tag-user/TagUser";
import { addUserToChatList } from "@/helpers/chat.helper";
import { animationList } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { useFindAllChatGroup } from "@/tantask/user.tanstack";
import { ChatGroup } from "@/types/chat-group.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Avatar as AvatarMantine, Box, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function HomeRight() {
   const t = useTranslations(`home-right`);
   const userId = useAppSelector((state) => state.user.info?.id);
   const findAllChatGroup = useFindAllChatGroup();
   const queryClient = useQueryClient();

   const handleClickUser = (user: TUser, chatGroup: ChatGroup) => {
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
                  if (chatGroup.ChatGroupMembers.length === 2) {
                     return (
                        <Box
                           key={i}
                           onClick={() => {
                              handleClickUser(user.Users, chatGroup);
                           }}
                           style={{ cursor: "pointer", ...animationList(i) }}
                        >
                           <TagUser user={user.Users} />
                        </Box>
                     );
                  }
               })}
            </Stack>

            {/* <Group justify="space-between">
               <Text opacity={0.7} fw={`bold`} fz={`md`}>
                  Nhóm chát
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
                  if (chatGroup.ChatGroupMembers.length > 2) {
                     return (
                        <Box
                           key={i}
                           onClick={() => {
                              handleClickUser(user.Users, chatGroup);
                           }}
                           style={{ cursor: "pointer", ...animationList(i) }}
                        >
                           <Tooltip.Group openDelay={300} closeDelay={100}>
                              <AvatarMantine.Group spacing="sm">
                                 {chatGroup.ChatGroupMembers.slice(0, 2).map((chatGroupMember) => {
                                    return <Avatar user={chatGroupMember.Users} radius="xl" />;
                                 })}
                                 <Tooltip
                                    withArrow
                                    label={
                                       <>
                                          {chatGroup.ChatGroupMembers.slice(2).map((chatGroupMember) => {
                                             return <div>{chatGroupMember.Users.fullName}</div>;
                                          })}
                                       </>
                                    }
                                 >
                                    <AvatarMantine radius="xl">{`+${chatGroup.ChatGroupMembers.length - 2}`}</AvatarMantine>
                                 </Tooltip>
                              </AvatarMantine.Group>
                           </Tooltip.Group>
                        </Box>
                     );
                  }
               })}
            </Stack> */}
         </Stack>
      </>
   );
}
