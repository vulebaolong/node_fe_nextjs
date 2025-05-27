"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";

export async function getLinkRtcAction(query: string) {
   try {
      const data = await api.get<any>(`${ENDPOINT.STREAM.GET}?cam=${query}`);
      console.log({ data });
      return data;
   } catch (error) {
      console.error("Get Link Rtc Failed", error);
      throw error;
   }
}