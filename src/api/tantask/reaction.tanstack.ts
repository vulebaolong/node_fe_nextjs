import { createReactionArticleAction } from "@/api/actions/reaction.action";
import { TCreateReactionArticleReq } from "@/types/reactioin.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateReactionArticle = () => {
   return useMutation({
      mutationFn: async (payload: TCreateReactionArticleReq) => {
         const { data, status, message } = await createReactionArticleAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
   });
};
