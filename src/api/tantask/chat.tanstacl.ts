import { getGetChatMessageAction } from "@/api/actions/chat.action";
import { TPayloadTable } from "@/components/custom/table/TableCustom";
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

export const useGetChatMessage = (payload: TPayloadTable) => {
    return useQuery({
        queryKey: ["get-message-list-chat", payload],
        queryFn: async () => {
            const { pagination, filters, sort } = payload;
            const { pageIndex, pageSize } = pagination;
            const query = `page=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}&sortBy=${sort?.sortBy}&isDesc=${sort?.isDesc}`;

            const { data, status, message } = await getGetChatMessageAction(query);
            if (status === "error" || data === null) throw new Error(message);

            console.log({ useGetChatMessage: data });
            return data;
        },
    });
};
