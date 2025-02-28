"use client";

import { useGetChatListUserBubble, useGetChatListUserItem } from "@/tantask/chat.tanstacl";
import { TChatListItem } from "@/types/chat.type";
import _ from "lodash";
import ChatUserBubble from "../chat-user-bubble/ChatUserBubble";
import ChatUserItem from "../chat-user-item/ChatUserItem";

export default function ChatContainer() {
   const chatListUserItem = useGetChatListUserItem();
   const chatListUserBubble = useGetChatListUserBubble();

   return (
      <>
         {_.isArray(chatListUserItem.data) &&
            chatListUserItem.data.map((item: TChatListItem, i) => {
               return <ChatUserItem key={item.id} item={item} i={i} />;
            })}
         {_.isArray(chatListUserBubble.data) &&
            chatListUserBubble.data.map((item: TChatListItem, i) => {
               return <ChatUserBubble key={item.id} item={item} i={i} />;
            })}
      </>
   );
}
