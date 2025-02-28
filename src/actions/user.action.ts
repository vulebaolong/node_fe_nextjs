"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TUploadAvatarLocalRes, TUser } from "@/types/user.type";

export async function uploadAvatarLocalAction(payload: FormData) {
   try {
      const { data } = await api.post<TRes<TUploadAvatarLocalRes>>(ENDPOINT.UPLOAD_AVATAR_LOCAL, payload);
      return data;
   } catch (error) {
      console.error("Upload Avatar Local Failed:", error);
      throw error;
   }
}

export async function uploadAvatarCloudAction(payload: FormData) {
   try {
      const { data } = await api.post<TRes<any>>(ENDPOINT.UPLOAD_AVATAR_CLOUD, payload);
      return data;
   } catch (error) {
      console.error("Upload Avatar Cloud Failed:", error);
      throw error;
   }
}

export async function findAllUserAction() {
   try {
      const { data } = await api.get<TResPagination<TUser[]>>(`${ENDPOINT.USER}?pageSize=100`);
      return data;
   } catch (error) {
      console.error("Get List User Failed", error);
      throw error;
   }
}
