import { CHAT_LIST_ID } from "@/constant/chat.constant";
import { useQuery } from "@tanstack/react-query";

export const useGetChatListId = () => {
   return useQuery({
      queryKey: ["chat-list-id"],
      queryFn: async () => {
         const stringLocal = localStorage.getItem(CHAT_LIST_ID);
         const listChatLocal = stringLocal ? JSON.parse(stringLocal) : [];
         return listChatLocal;
      },
   });
};
