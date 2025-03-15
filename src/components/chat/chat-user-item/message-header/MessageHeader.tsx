import { useSocket } from "@/hooks/socket.hook";
import TagUser from "@/components/tag-user/TagUser";
import { CHAT_LIST_ITEM, SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent, removeUserFromChatList } from "@/helpers/chat.helper";
import { useAppSelector } from "@/redux/hooks";
import { TChatListItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Group } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

type TProps = {
   item: TChatListItem;
};

export default function MessageHeader({ item }: TProps) {
   const queryClient = useQueryClient();
   const { socket } = useSocket();
   const userId = useAppSelector((state) => state.user.info?.id);

   const handleDeleteListChat = (e: any) => {
      e.stopPropagation();
      removeUserFromChatList(item, CHAT_LIST_ITEM, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
      });
      if (socket) {
         emitToEvent(socket, SOCKET_CHAT_MES.LEAVE_ROOM, { userIdSender: userId, userIdRecipient: item.id });
      }
   };

   return (
      <Group p={10} justify="space-between">
         <TagUser user={{ avatar: item.ava, fullName: item.name } as TUser} />
         <ActionIcon onClick={handleDeleteListChat} variant="subtle" color="indigo" radius="xl" aria-label="Settings">
            <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
         </ActionIcon>
      </Group>
   );
}
