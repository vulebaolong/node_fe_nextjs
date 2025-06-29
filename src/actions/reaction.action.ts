"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResAction } from "@/types/app.type";
import { TCreateReactionArticleReq, TReactionArticle } from "@/types/reactioin.type";

export async function createReactionArticleAction(payload: TCreateReactionArticleReq): Promise<TResAction<TReactionArticle | null>> {
   try {
      const result = await api.post<TRes<TReactionArticle>>(ENDPOINT.REACTION_ARTICLE.CREATE, payload);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}
