"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TArticle } from "@/types/article.type";

export async function getListArticleAction() {
   try {
      const { data } = await api.get<TResPagination<TArticle[]>>(`${ENDPOINT.ARTICLE.LIST}`);
      return data;
   } catch (error) {
      console.error("Get info failed:", error);
      throw error;
   }
}

export async function createArticleAction(payload: FormData) {
   try {
      const { data } = await api.post<TRes<any>>(ENDPOINT.ARTICLE.CREATE, payload);
      // revalidateTag(`article-list`)
      return data;
   } catch (error) {
      console.error("Create Article Failed", error);
      throw error;
   }
}
