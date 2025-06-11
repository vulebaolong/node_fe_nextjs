import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent, listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { TChatListItem } from "@/types/chat.type";
import { Divider, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import MessageHeader from "./message-header/MessageHeader";
import MessageInput from "./message-input/MessageInput";
import MessageList from "./message-list/MessageList";

type TProps = {
   item: TChatListItem;
   i: number;
};

export default function ChatUserItem({ i, item }: TProps) {
   const [onlyOne, setOnlyOne] = useState(1);
   const userId = useAppSelector((state) => state.user.info?.id);
   const { socket } = useSocket();

   useEffect(() => {
      if (socket && onlyOne === 1 && userId) {
         setOnlyOne((prev) => prev++);
      }
   }, [socket, userId, item.id]);

   useEffect(() => {
      return () => {
         if (socket && item.chatGroupId) {
            socket.emit(SOCKET_CHAT_MES.LEAVE_ROOM, { chatGroupId: item.chatGroupId });
         }
      };
   }, []);

   return (
      <Stack
         gap={0}
         right={`${340 * (i + 1) - 250 + 10 * i}px`}
         sx={(_, u) => {
            return {
               width: `340px`,
               height: `455px`,
               position: `fixed`,
               bottom: 0,
               boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
               border: `1px solid var(--divider-size) var(--divider-border-style, solid) var(--divider-color)`,
               borderRadius: `10px`,
               [u.light]: {
                  backgroundColor: `var(--mantine-color-gray-2)`,
               },
               [u.dark]: {
                  backgroundColor: `var(--mantine-color-dark-6)`,
               },
               zIndex: 1,
            };
         }}
      >
         <MessageHeader item={item} />
         <Divider />
         <MessageList item={item} chatGroupId={item.chatGroupId} />
         <Divider />
         <MessageInput item={item} chatGroupId={item.chatGroupId} />
      </Stack>
   );
}
