"use server";
import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "../core.api";
import { TRes, TResAction } from "@/types/app.type";
import { TPayloadTotpDisable, TPayloadTotpSave } from "@/types/totp.type";

export async function totpGenerateAction(): Promise<TResAction<any | null>> {
   try {
      const result = await api.post<TRes<any>>(`${ENDPOINT.TOTP.GENERATE}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function totpSaveAction(payload: TPayloadTotpSave): Promise<TResAction<any | null>> {
   try {
      const result = await api.post<TRes<any>>(`${ENDPOINT.TOTP.SAVE}`, payload);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function totpDisableAction(payload: TPayloadTotpDisable): Promise<TResAction<any | null>> {
   try {
      const result = await api.post<TRes<any>>(`${ENDPOINT.TOTP.DISABLE}`, payload);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}
