import { CHAT_BUBBLE } from "@/constant/chat.constant";
import { openChatFromBuble, removeChatOpened } from "@/helpers/chat.helper";
import { TStateChat } from "@/types/chat.type";
import { ActionIcon, Box, Transition } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import AvatarChatGroup from "../chat-user-item/avatar-chat-group/AvatarChatGroup";

type TProps = {
   stateChat: TStateChat;
   i: number;
};

export default function ChatUserBubble({ stateChat, i }: TProps) {
   const queryClient = useQueryClient();
   const { hovered, ref } = useHover();

   const handleDeleteListChat = (e: any) => {
      e.stopPropagation();
      removeChatOpened(stateChat, CHAT_BUBBLE, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
      });
   };

   const handleOpenUserChat = () => {
      openChatFromBuble(stateChat, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
      });
   };

   return (
      <Box
         key={i}
         style={{
            position: `fixed`,
            right: 10,
            bottom: `${60 * (i + 1) + 5 * i}px`,
            boxHhadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
            borderRadius: `10px`,
            cursor: `pointer`,
            zIndex: 1,
         }}
         ref={ref}
         onClick={handleOpenUserChat}
      >
         <AvatarChatGroup width={`60px`} height={`60px`} stateChat={stateChat} isTextName={false} />
         <Box
            style={{
               position: `absolute`,
               top: 7,
               right: 7,
               width: `50%`,
               transform: `translate(50%, -50%)`,
               zIndex: 3
            }}
         >
            <Transition mounted={hovered} transition="scale-y" duration={300} timingFunction="ease">
               {(styles) => (
                  <div style={styles}>
                     <ActionIcon onClick={handleDeleteListChat} variant="filled" color="indigo" radius="xl" aria-label="Settings">
                        <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
                     </ActionIcon>
                  </div>
               )}
            </Transition>
         </Box>
      </Box>
   );
}
