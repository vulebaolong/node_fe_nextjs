import Avatar from "@/components/avatar/Avatar";
import TagUser from "@/components/tag-user/TagUser";
import { CHAT_LIST_ITEM, SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent, removeUserFromChatList } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { TChatListItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

type TProps = {
   item: TChatListItem;
};

export default function MessageHeader({ item }: TProps) {
   const queryClient = useQueryClient();
   const { socket } = useSocket();

   const handleDeleteListChat = (e: any) => {
      e.stopPropagation();
      removeUserFromChatList(item, CHAT_LIST_ITEM, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
      });
      if (socket) {
         emitToEvent(socket, SOCKET_CHAT_MES.LEAVE_ROOM, { chatGroupId: item.chatGroupId });
      }
   };

   return (
      <Group sx={{ padding: `10px`, justifyContent: `space-between`, flexWrap: `nowrap` }}>
         {(item.chatGroup?.ChatGroupMembers || []).length > 2 ? (
            <Group wrap="nowrap" gap={5}>
               <Box sx={{ width: `38px`, height: `38px`, position: `relative`, flexShrink: 0 }}>
                  {(item.chatGroup?.ChatGroupMembers || []).slice(0, 2).map((chatGroupMember, i) => {
                     if (i === 0) {
                        return (
                           <Box key={i} sx={{ position: `absolute`, bottom: 0, left: 0, zIndex: 2 }}>
                              <Avatar size={`sm`} user={chatGroupMember.Users} radius="xl" />
                           </Box>
                        );
                     } else {
                        return (
                           <Box key={i} sx={{ position: `absolute`, top: 0, right: 0, zIndex: 1 }}>
                              <Avatar size={`sm`} user={chatGroupMember.Users} radius="xl" />
                           </Box>
                        );
                     }
                  })}
               </Box>
               <Text truncate>{item.chatGroup?.name}</Text>
            </Group>
         ) : (
            <Box maw={250}>
               <TagUser size={"sm"} user={{ avatar: item.ava, fullName: item.name } as TUser} />
            </Box>
         )}

         <ActionIcon onClick={handleDeleteListChat} variant="subtle" color="indigo" radius="xl" aria-label="Settings">
            <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
         </ActionIcon>
      </Group>
   );
}
