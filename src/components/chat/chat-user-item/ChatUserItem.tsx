import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent, removeEventListener } from "@/helpers/chat.helper";
import { useAppSelector } from "@/redux/hooks";
import { TChatListItem } from "@/types/chat.type";
import { Divider, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./ChatUserItem.module.css";
import MessageHeader from "./message-header/MessageHeader";
import MessageInput from "./message-input/MessageInput";
import MessageListAll from "./message-list/MessageList";
import { useSocket } from "@/hooks/socket.hook";

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
         emitToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM, { userIdSender: userId, userIdRecipient: item.id });
      }
   }, [socket, userId, item.id]);

   useEffect(() => {
      return () => {
         if (socket) {
            removeEventListener(socket, SOCKET_CHAT_MES.JOIN_ROOM);
            socket.emit(SOCKET_CHAT_MES.LEAVE_ROOM, { userIdSender: userId, userIdRecipient: item.id });
         }
      };
   }, []);

   return (
      <Stack gap={0} right={`${340 * (i + 1) - 250 + 10 * i}px`} className={`${classes[`container`]}`}>
         <MessageHeader item={item} />
         <Divider />
         <MessageListAll item={item} />
         <Divider />
         <MessageInput item={item} />
      </Stack>
   );
}
