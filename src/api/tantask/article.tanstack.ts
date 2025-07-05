import { createArticleAction, getListArticleAction } from "@/api/actions/article.action";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetListArticle = () => {
   return useQuery({
      queryKey: ["get-list-article"],
      queryFn: async () => {
         const { data, status, message } = await getListArticleAction();
         if (status === "error" || data === null) throw new Error(message);
         console.log({ useGetListArticle: data });
         return data;
      },
   });
};

export const useCreateArticle = () => {
   return useMutation({
      mutationFn: async (payload: FormData) => {
         const { data, status, message } = await createArticleAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
   });
};
