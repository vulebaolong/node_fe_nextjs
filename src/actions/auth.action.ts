"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { clearTokens, setAccessToken, setRefreshToken } from "@/helpers/cookies.helper";
import { TRes } from "@/types/app.type";
import { TLoginFormReq, TLoginRes, TRegisterReq, TRegisterRes } from "@/types/auth.type";
import { TUser } from "@/types/user.type";

export async function registerAction(payload: TRegisterReq) {
   try {
      const { data } = await api.post<TRes<TRegisterRes>>(ENDPOINT.AUTH.REGISTER, payload);
      return data;
   } catch (error) {
      console.error("Register failed:", error);
      throw error;
   }
}

export async function loginFormAction(payload: TLoginFormReq) {
   try {
      const { data } = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.LOGIN, payload);
      console.log(data);
      await setAccessToken(data.accessToken);
      await setRefreshToken(data.refreshToken);
      return data;
   } catch (error) {
      console.error("Login failed:", error);
      throw error;
   }
}

export async function getInfoAction() {
   try {
      const { data } = await api.get<TRes<TUser>>(ENDPOINT.AUTH.GET_INFO);
      return data;
   } catch (error) {
      console.error("Get info failed:", error);
      throw error;
   }
}

export async function clearTokensAction() {
   try {
      await clearTokens();
      return true;
   } catch (error) {
      console.error("Clear Token Failed:", error);
      throw error;
   }
}
