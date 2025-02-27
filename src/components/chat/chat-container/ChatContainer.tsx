import { useGetChatListId } from "@/tantask/chat.tanstacl";
import { TChatListItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import _ from "lodash";
import ChatUserBubble from "../chat-user-bubble/ChatUserBubble";
import ChatUserItem from "../chat-user-item/ChatUserItem";

export default function ChatContainer() {
   const chatListId = useGetChatListId();

   return (
      <>
         {_.isArray(chatListId.data) &&
            chatListId.data
               .slice(0, 2)
               .reverse()
               .map((item, i) => {
                  return <ChatUserItem key={i} item={item} i={i} />;
               })}
         {_.isArray(chatListId.data) &&
            chatListId.data
               .slice(1, -1)
               .reverse()
               .map((item: TChatListItem, i) => {
                  return <ChatUserBubble key={i} i={i} item={item} user={{ avatar: item.ava, fullName: item.name } as TUser} />;
               })}
      </>
   );
}
