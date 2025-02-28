import Avatar from "@/components/avatar/Avatar";
import { CHAT_LIST_BUBBLE } from "@/constant/chat.constant";
import { openUserFromBuble, removeUserFromChatList } from "@/helpers/chat.helper";
import { TChatListItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Transition } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

type TProps = {
   item: TChatListItem;
   i: number;
};

export default function ChatUserBubble({ item, i }: TProps) {
   const queryClient = useQueryClient();
   const { hovered, ref } = useHover();

   const handleDeleteListChat = (e: any) => {
      e.stopPropagation();
      removeUserFromChatList(item, CHAT_LIST_BUBBLE, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
      });
   };

   const handleOpenUserChat = () => {
      openUserFromBuble(item, () => {
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
         <Avatar style={{ width: `60px`, height: `60px` }} user={{ avatar: item.ava, fullName: item.name } as TUser} />
         <Box
            style={{
               position: `absolute`,
               top: 7,
               right: 7,
               width: `50%`,
               transform: `translate(50%, -50%)`,
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
