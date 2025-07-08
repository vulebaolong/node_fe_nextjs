import { TfriendshipAction } from "@/types/friend.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { findOneFriendAction, friendStatusAction, getMyFriendAction, getOtherFriendAction } from "../actions/friend.action";
import { toast } from "react-toastify";
import { resError } from "@/helpers/function.helper";
import { TPayloadTable } from "@/components/custom/table/TableCustom";

export const useFriendStatus = () => {
    return useMutation({
        mutationFn: async (payload: TfriendshipAction) => {
            const { data, status, message } = await friendStatusAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            return data;
        },
        onError: (error) => {
            console.log(error);
            toast.error(resError(error, `Friend status failed`));
        },
    });
};

export const useFindOneFriend = (payload: string) => {
    return useQuery({
        queryKey: ["find-one-friend", payload],
        queryFn: async () => {
            const { data, status, message } = await findOneFriendAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useFindOneFriend: data });
            return data;
        },
    });
};

export const useGetMyFriend = (payload: TPayloadTable) => {
    return useQuery({
        queryKey: ["get-my-article", payload],
        queryFn: async () => {
            const { pagination, filters, sort } = payload;
            const { pageIndex, pageSize } = pagination;
            const query = `page=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}&sortBy=${sort?.sortBy}&isDesc=${sort?.isDesc}`;

            const { data, status, message } = await getMyFriendAction(query);
            if (status === "error" || data === null) throw new Error(message);

            console.log({ useGetMyFriend: data });
            return data;
        },
    });
};

export const useGetOtherFriend = (payload: TPayloadTable & { id?: string }) => {
    return useQuery({
        queryKey: ["get-other-article", payload],
        queryFn: async () => {
            const { pagination, filters, sort, id } = payload;
            const { pageIndex, pageSize } = pagination;
            if (!id) throw new Error("ID is required");
            const query = `/${id}?page=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}&sortBy=${sort?.sortBy}&isDesc=${
                sort?.isDesc
            }`;

            const { data, status, message } = await getOtherFriendAction(query);
            if (status === "error" || data === null) throw new Error(message);

            console.log({ useGetOtherArticle: data });
            return data;
        },
    });
};
