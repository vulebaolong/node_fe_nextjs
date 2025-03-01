"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { clearTokens, setAccessToken, setRefreshToken } from "@/helpers/cookies.helper";
import { TRes } from "@/types/app.type";
import { TLoginFormReq, TLoginRes, TRegisterReq, TRegisterRes } from "@/types/auth.type";
import { TLoginFacebookReq } from "@/types/facebook.type";
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

export async function loginFacebookction(payload: TLoginFacebookReq) {
   try {
      const { data } = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.FACEBOOK_LOGIN, payload);
      
      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return data;
   } catch (error) {
      console.error("Login failed:", error);
      throw error;
   }
}

export async function loginGooleAction(payload: { code: string }) {
   try {
      const { data } = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.GOOGLE_LOGIN, payload);
      
      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return data;
   } catch (error) {
      console.error("Login failed:", error);
      throw error;
   }
}

export async function loginFormAction(payload: TLoginFormReq) {
   try {
      const { data } = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.LOGIN, payload);
      
      if (!data?.isGoogleAuthenticator && data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return data;
   } catch (error) {
      console.error("Login failed:", error);
      throw error;
   }
}

export async function loginGoogleAuthenticatorAction(payload: TLoginFormReq) {
   try {
      const { data } = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.LOGIN_GOOGLE_AUTHENTICATOR, payload);
      
      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

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
