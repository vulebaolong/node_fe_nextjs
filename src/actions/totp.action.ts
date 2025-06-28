"use server";
import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes } from "@/types/app.type";
import { TPayloadTotpDisable, TPayloadTotpSave } from "@/types/totp.type";

export async function totpGenerateAction() {
   try {
      const { data } = await api.post<TRes<any>>(`${ENDPOINT.TOTP.GENERATE}`);
      return data;
   } catch (error) {
      console.error("Generate totp failed", error);
      throw error;
   }
}

export async function totpSaveAction(payload: TPayloadTotpSave) {
   try {
      const { data } = await api.post<TRes<any>>(`${ENDPOINT.TOTP.SAVE}`, payload);
      return data;
   } catch (error) {
      console.error("Save totp failed", error);
      throw error;
   }
}

export async function totpDisableAction(payload: TPayloadTotpDisable) {
   try {
      const { data } = await api.post<TRes<any>>(`${ENDPOINT.TOTP.DISABLE}`, payload);
      return data;
   } catch (error) {
      console.error("Disable totp failed", error);
      throw error;
   }
}
