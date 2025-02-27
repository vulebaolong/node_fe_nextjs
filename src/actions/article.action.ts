"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TArticle } from "@/types/article.type";
import { revalidateTag } from "next/cache";

export async function getListArticleAction() {
   try {
      const { data } = await api.get<TResPagination<TArticle[]>>(ENDPOINT.ARTICLE.LIST, {
         next: { tags: [`article-list`] },
      });
      return data;
   } catch (error) {
      console.error("Get info failed:", error);
      throw error;
   }
}

export async function createArticleAction(payload: FormData) {
   try {
      const { data } = await api.post<TRes<any>>(ENDPOINT.ARTICLE.CREATE, payload);
      revalidateTag(`article-list`)
      console.log({ data });
      return data;
   } catch (error) {
      console.error("Create Article Failed", error);
      throw error;
   }
}


