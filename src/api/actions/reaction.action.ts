"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import { TRes, TResAction } from "@/types/app.type";
import { TCreateReactionArticleReq, TReaction } from "@/types/reactioin.type";
import api from "../core.api";

export async function createReactionArticleAction(payload: TCreateReactionArticleReq): Promise<TResAction<TReaction | null>> {
   try {
      const result = await api.post<TRes<TReaction>>(ENDPOINT.REACTION, payload);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}
