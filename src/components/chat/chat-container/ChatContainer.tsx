"use client";

import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useGetChatListUserBubble, useGetChatListUserItem } from "@/tantask/chat.tanstacl";
import { TAllmessage, TStateChat } from "@/types/chat.type";
import _ from "lodash";
import { useEffect, useState } from "react";
import ChatUserBubble from "../chat-user-bubble/ChatUserBubble";
import ChatUserItem from "../chat-user-item/ChatUserItem";

export default function ChatContainer() {
   const chatListUserItem = useGetChatListUserItem();
   const chatListUserBubble = useGetChatListUserBubble();

   const [dataSendMessages, setDataSendMessages] = useState<{ [key: string]: TAllmessage }>({});

   const { socket } = useSocket();
   useEffect(() => {
      if (!socket) return;

      listenToEvent(socket, SOCKET_CHAT_MES.SEND_MESSAGE, (data: TAllmessage) => {
         setDataSendMessages((prev) => {
            return {
               ...prev,
               [data.chatGroupId]: data,
            };
         });
      });

      return () => {
         if (!socket) return;
         removeEventListener(socket, SOCKET_CHAT_MES.SEND_MESSAGE);
      };
   }, [socket]);

   return (
      <>
         {_.isArray(chatListUserItem.data) &&
            chatListUserItem.data.map((stateChat: TStateChat, i) => {
               return (
                  <ChatUserItem key={stateChat.chatGroupId} stateChat={stateChat} i={i} dataSendMessage={dataSendMessages[stateChat.chatGroupId]} />
               );
            })}
         {_.isArray(chatListUserBubble.data) &&
            chatListUserBubble.data.map((stateChat: TStateChat, i) => {
               return <ChatUserBubble key={stateChat.chatGroupId} stateChat={stateChat} i={i} />;
            })}
      </>
   );
}
