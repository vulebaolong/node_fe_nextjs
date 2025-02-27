import { createReactionArticleAction } from "@/actions/reaction.action";
import { TCreateReactionArticleReq } from "@/types/reactioin.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateReactionArticle = () => {
   return useMutation({
      mutationFn: async (payload: TCreateReactionArticleReq) => {
         const data = await createReactionArticleAction(payload);
         return data;
      },
   });
};
