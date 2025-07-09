"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import { clearTokens, setAccessToken, setRefreshToken } from "@/helpers/cookies.helper";
import { TRes, TResAction } from "@/types/app.type";
import { TLoginFormGaReq, TLoginFormReq, TLoginGoogleGaReq, TLoginGoogleWithTotpReq, TLoginRes, TRegisterReq, TRegisterRes } from "@/types/auth.type";
import { TLoginFacebookReq } from "@/types/facebook.type";
import { TUser } from "@/types/user.type";
import api from "../core.api";

export async function registerAction(payload: TRegisterReq): Promise<TResAction<TRegisterRes | null>> {
   try {
      const result = await api.post<TRes<TRegisterRes>>(ENDPOINT.AUTH.REGISTER, payload);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function loginFacebookction(payload: TLoginFacebookReq): Promise<TResAction<TLoginRes | null>> {
   try {
      const result = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.FACEBOOK_LOGIN, payload);
      const { data } = result;

      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function loginGooleAction(payload: { code: string }): Promise<TResAction<TLoginRes | null>> {
   try {
      const result = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.GOOGLE_LOGIN, payload);
      const { data } = result;

      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function loginFormAction(payload: TLoginFormReq): Promise<TResAction<TLoginRes | null>> {
   try {
      const result = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.LOGIN, payload);
      const { data } = result;
      if (!data.isTotp && data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function loginGoogleWithTotpAction(payload: TLoginGoogleWithTotpReq): Promise<TResAction<TLoginRes | null>> {
   try {
      const result = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.LOGIN_GOOGLE_WITH_TOTP, payload);
      const { data } = result;
      if (!data.isTotp && data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function loginGooleGaAction(payload: TLoginGoogleGaReq): Promise<TResAction<TLoginRes | null>> {
   try {
      const result = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.GOOGLE_LOGIN, payload);
      const { data } = result;

      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function loginFormGaAction(payload: TLoginFormGaReq): Promise<TResAction<TLoginRes | null>> {
   try {
      const result = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.GOOGLE_LOGIN, payload);
      const { data } = result;

      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function loginGoogleAuthenticatorAction(payload: TLoginFormReq): Promise<TResAction<TLoginRes | null>> {
   try {
      const result = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.LOGIN_GOOGLE_AUTHENTICATOR, payload);
      const { data } = result;

      if (data?.accessToken && data?.refreshToken) {
         await setAccessToken(data?.accessToken);
         await setRefreshToken(data?.refreshToken);
      }

      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function getInfoAction(): Promise<TResAction<TUser | null>> {
   try {
      const result = await api.get<TRes<TUser>>(ENDPOINT.AUTH.GET_INFO);
      const { data } = result;

      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
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
