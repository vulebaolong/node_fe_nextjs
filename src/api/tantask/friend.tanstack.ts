import { TfriendshipAction } from "@/types/friend.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { findOneFriendAction, friendStatusAction } from "../actions/friend.action";
import { toast } from "react-toastify";
import { resError } from "@/helpers/function.helper";

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
