import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { TAllmessage, TStateChat } from "@/types/chat.type";
import { Divider, Stack } from "@mantine/core";
import React, { useEffect } from "react";
import MessageHeader from "./message-header/MessageHeader";
import MessageInput from "./message-input/MessageInput";
import MessageList from "./message-list/MessageList";
import _ from "lodash";

type TProps = {
   stateChat: TStateChat;
   dataSendMessage: TAllmessage;
   i: number;
};

 function ChatUserItem({ i, stateChat, dataSendMessage }: TProps) {
   const { socket } = useSocket();

   useEffect(() => {
      if (!socket) return;
      emitToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM, { chatGroupId: stateChat.chatGroupId });

      return () => {
         if (!socket) return;
         emitToEvent(socket, SOCKET_CHAT_MES.LEAVE_ROOM, { chatGroupId: stateChat.chatGroupId });
      };
   }, [socket]);

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
         <MessageHeader stateChat={stateChat} />
         <Divider />
         <MessageList stateChat={stateChat} dataSendMessage={dataSendMessage} />
         <Divider />
         <MessageInput stateChat={stateChat} />
      </Stack>
   );
}

export default React.memo(ChatUserItem, (prev, next) => {
  return (
    prev.stateChat.chatGroupId === next.stateChat.chatGroupId &&
    prev.i === next.i &&
    _.isEqual(prev.dataSendMessage, next.dataSendMessage)
  );
});