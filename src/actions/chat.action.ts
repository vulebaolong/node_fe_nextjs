'use server'

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TPayloadData } from "@/types/chat.type";

export async function getGetChatMessageAction(query:string) {
   try {
      const { data } = await api.get<TRes<TResPagination<TPayloadData>>>(`${ENDPOINT.CHAT_MESSAGE}?${query}`);
      return data;
   } catch (error) {
      console.error("Get List User Failed", error);
      throw error;
   }
}
