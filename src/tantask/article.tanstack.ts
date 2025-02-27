import { createArticleAction } from "@/actions/article.action";
import { useMutation } from "@tanstack/react-query";

export const useCreateArticle = () => {
   return useMutation({
      mutationFn: async (payload: FormData) => {
         const data = await createArticleAction(payload);
         return data;
      },
   });
};
