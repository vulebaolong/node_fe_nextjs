import { CHAT_OPENED } from "@/constant/chat.constant";
import { removeChatOpened } from "@/helpers/chat.helper";
import { TStateChat } from "@/types/chat.type";
import { ActionIcon, Group } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import AvatarChatGroup from "../avatar-chat-group/AvatarChatGroup";

type TProps = {
   stateChat: TStateChat;
};

export default function MessageHeader({ stateChat }: TProps) {
   const queryClient = useQueryClient();

   const handleDeleteListChat = (e: any) => {
      e.stopPropagation();
      removeChatOpened(stateChat, CHAT_OPENED, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
      });
   };

   return (
      <Group sx={{ padding: `10px`, justifyContent: `space-between`, flexWrap: `nowrap` }}>
         <AvatarChatGroup stateChat={stateChat} isTextName={true} />

         <ActionIcon onClick={handleDeleteListChat} variant="subtle" color="indigo" radius="xl" aria-label="Settings">
            <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
         </ActionIcon>
      </Group>
   );
}
