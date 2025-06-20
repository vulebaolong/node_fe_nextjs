import { getGetChatMessageAction } from "@/actions/chat.action";
import { CHAT_BUBBLE, CHAT_OPENED } from "@/constant/chat.constant";
import { getChatOpened } from "@/helpers/chat.helper";
import { useQuery } from "@tanstack/react-query";

export const useGetChatListUserItem = () => {
   return useQuery({
      queryKey: ["chat-list-user-item"],
      queryFn: async () => {
         return getChatOpened(CHAT_OPENED).slice(0, 2);
      },
   });
};

export const useGetChatListUserBubble = () => {
   return useQuery({
      queryKey: ["chat-list-user-bubble"],
      queryFn: async () => {
         return getChatOpened(CHAT_BUBBLE);
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
         // await wait(500);
         console.log({ useGetChatMessage: data });
         return data;
      },
   });
};
