import { createArticleAction, getListArticleAction } from "@/actions/article.action";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetListArticle = () => {
   return useQuery({
      queryKey: ["get-list-article"],
      queryFn: async () => {
         const data = await getListArticleAction();
         return data;
      },
   });
};

export const useCreateArticle = () => {
   return useMutation({
      mutationFn: async (payload: FormData) => {
         const data = await createArticleAction(payload);
         return data;
      },
   });
};
