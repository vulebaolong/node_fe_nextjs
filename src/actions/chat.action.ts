'use server'

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TCreateChatRes } from "@/types/chat.type";

export async function getListMessageChatAction(query:string) {
   try {
      const { data } = await api.get<TRes<TResPagination<TCreateChatRes>>>(`${ENDPOINT.CHAT.FIND_ALL}?${query}`);
      return data;
   } catch (error) {
      console.error("Get List User Failed", error);
      throw error;
   }
}
