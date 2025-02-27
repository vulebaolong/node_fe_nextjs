import { Avatar } from "@/components/avatar/Avatar";
import { CHAT_LIST_ID } from "@/constant/chat.constant";
import { moveElementToTop } from "@/helpers/function.helper";
import { TChatListItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Transition } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";

type TProps = {
   i: number;
   user: TUser;
   item: TChatListItem;
};

export default function ChatUserBubble({ i, user, item }: TProps) {
   const queryClient = useQueryClient();
   const { hovered, ref } = useHover();

   const handleDeleteListChat = (e: any) => {
      e.stopPropagation();

      const stringLocal = localStorage.getItem(CHAT_LIST_ID);
      const listChatLocal = stringLocal ? JSON.parse(stringLocal) : [];

      if (_.isArray(listChatLocal)) {
         _.remove(listChatLocal, (itemChat) => itemChat.id === item.id);
         localStorage.setItem(CHAT_LIST_ID, JSON.stringify(listChatLocal));
         queryClient.invalidateQueries({ queryKey: [`chat-list-id`] });
      }
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
         }}
         ref={ref}
         onClick={() => {
            const stringLocal = localStorage.getItem(CHAT_LIST_ID);
            const listChatLocal = stringLocal ? JSON.parse(stringLocal) : [];

            if (_.isArray(listChatLocal)) {
               const newListChat = moveElementToTop(listChatLocal, (chatItem) => chatItem.id === item.id);
               localStorage.setItem(CHAT_LIST_ID, JSON.stringify(newListChat));
               queryClient.invalidateQueries({ queryKey: [`chat-list-id`] });
            }
         }}
      >
         <Avatar style={{ width: `60px`, height: `60px` }} user={user} />
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
