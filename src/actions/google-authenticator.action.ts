'use server'

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes } from "@/types/app.type";
import { TGetQrGoogleAuthenticatorRes } from "@/types/google-authenticator.type";

export async function getQrGoogleAuthenticatorAction() {
   try {
      const { data } = await api.get<TRes<TGetQrGoogleAuthenticatorRes>>(`${ENDPOINT.GOOGLE_AUTHENTICATOR.GET_QR_GOOGLE_AUTHENTICATOR}`);
      return data;
   } catch (error) {
      console.error("Get QR Google Authenticator Failed", error);
      throw error;
   }
}

export async function onOffGoogleAuthenticatorAction() {
   try {
      const { data } = await api.put<TRes<any>>(`${ENDPOINT.GOOGLE_AUTHENTICATOR.ON_OFF_GOOGLE_AUTHENTICATOR}`);
      return data;
   } catch (error) {
      console.error("On/Off Google Authenticator Failed", error);
      throw error;
   }
}
