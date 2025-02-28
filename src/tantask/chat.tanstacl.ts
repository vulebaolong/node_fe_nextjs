import { getListMessageChatAction } from "@/actions/chat.action";
import { CHAT_LIST_BUBBLE, CHAT_LIST_ITEM } from "@/constant/chat.constant";
import { getChatListUser } from "@/helpers/chat.helper";
import { useQuery } from "@tanstack/react-query";

export const useGetChatListUserItem = () => {
   return useQuery({
      queryKey: ["chat-list-user-item"],
      queryFn: async () => {
         return getChatListUser(CHAT_LIST_ITEM).slice(0, 2);
      },
   });
};

export const useGetChatListUserBubble = () => {
   return useQuery({
      queryKey: ["chat-list-user-bubble"],
      queryFn: async () => {
         return getChatListUser(CHAT_LIST_BUBBLE);
      },
   });
};

type TMessageListChatAll = {
   page: number;
   userIdRecipient: number;
};
export const useMessageListChat = ({ page, userIdRecipient }: TMessageListChatAll) => {
   return useQuery({
      queryKey: ["get-message-list-chat", page, userIdRecipient],
      queryFn: async () => {
         const query = `page=${page}&userIdRecipient=${userIdRecipient}&pageSize=10`;
         const data = await getListMessageChatAction(query);
         return data;
      },
   });
};
