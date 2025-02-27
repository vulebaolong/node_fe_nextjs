'use server'

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes } from "@/types/app.type";
import { TCreateReactionArticleReq, TReactionArticle } from "@/types/reactioin.type";

export async function createReactionArticleAction(payload: TCreateReactionArticleReq) {
   try {
      const { data } = await api.post<TRes<TReactionArticle>>(ENDPOINT.REACTION_ARTICLE.CREATE, payload);
      return data;
   } catch (error) {
      console.error("Reaction Failed", error);
      throw error;
   }
}