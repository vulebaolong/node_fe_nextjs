"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import { TRes, TResAction, TResPagination } from "@/types/app.type";
import { TArticle } from "@/types/article.type";
import api from "../core.api";

export async function getAllArticleAction(query: string): Promise<TResAction<TResPagination<TArticle> | null>> {
   try {
      console.log(`${ENDPOINT.ARTICLE_MY}?${query}`);
      const result = await api.get<TRes<TResPagination<TArticle>>>(`${ENDPOINT.ARTICLE_ALL}?${query}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function getMyArticleAction(query: string): Promise<TResAction<TResPagination<TArticle> | null>> {
   try {
      console.log(`${ENDPOINT.ARTICLE_MY}?${query}`);
      const result = await api.get<TRes<TResPagination<TArticle>>>(`${ENDPOINT.ARTICLE_MY}?${query}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function getOtherArticleAction(query: string): Promise<TResAction<TResPagination<TArticle> | null>> {
   try {
      const result = await api.get<TRes<TResPagination<TArticle>>>(`${ENDPOINT.ARTICLE_OTHER}${query}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function createArticleAction(payload: FormData): Promise<TResAction<any| null>> {
   try {
      const result = await api.post<TRes<any>>(ENDPOINT.ARTICLE, payload);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}
