import { getGetChatMessageAction } from "@/actions/chat.action";
import { CHAT_LIST_BUBBLE, CHAT_LIST_ITEM } from "@/constant/chat.constant";
import { getChatListUser } from "@/helpers/chat.helper";
import { wait } from "@/helpers/function.helper";
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
   filters: any;
};
export const useGetChatMessage = ({ page, filters }: TMessageListChatAll) => {
   return useQuery({
      queryKey: ["get-message-list-chat", page, filters],
      queryFn: async () => {
         const query = `page=${page}&filters=${JSON.stringify(filters)}&pageSize=10`;
         const data = await getGetChatMessageAction(query);
         // await wait(3000);
         // throw new Error("error");
         console.log({ useGetChatMessage: data });
         return data;
      },
   });
};
