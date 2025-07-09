"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "../core.api";
import { TRes, TResAction } from "@/types/app.type";

export async function onOffGoogleAuthenticatorAction(): Promise<TResAction<any | null>> {
   try {
      const result = await api.put<TRes<any>>(`${ENDPOINT.GOOGLE_AUTHENTICATOR.ON_OFF_GOOGLE_AUTHENTICATOR}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}
