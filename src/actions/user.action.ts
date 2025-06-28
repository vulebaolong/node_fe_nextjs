"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TChatGroup } from "@/types/chat.type";
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
      const { data } = await api.get<TRes<TResPagination<TUser>>>(`${ENDPOINT.USER}?pageSize=100`);
      return data;
   } catch (error) {
      console.error("Get List User Failed", error);
      throw error;
   }
}

export async function findAllChatGroupAction() {
   try {
      const { data } = await api.get<TRes<TResPagination<TChatGroup>>>(`${ENDPOINT.CHAT_GROUP}?pageSize=100`);
      return data;
   } catch (error) {
      console.error("Get List User Failed", error);
      throw error;
   }
}

export async function findAllChatGroupByTokenAction() {
   try {
      const { data } = await api.get<TRes<TResPagination<TChatGroup>>>(`${ENDPOINT.CHAT_GROUP}?pageSize=100`);
      return data;
   } catch (error) {
      console.error("Get List User Failed", error);
      throw error;
   }
}

export async function getDetailUserAction(userId: string) {
   try {
      const { data } = await api.get<TRes<TUser>>(`${ENDPOINT.USER}/${userId}`);
      return data;
   } catch (error) {
      console.error("Get Detail User Failed", error);
      throw error;
   }
}

export async function searchNameUserAction(filters: string) {
   try {
      const queryFilters = { fullName: filters };
      const { data } = await api.get<TRes<TResPagination<TUser>>>(`${ENDPOINT.USER}?pageSize=100&page=1&filters=${JSON.stringify(queryFilters)}`);
      return data;
   } catch (error) {
      console.error("Get List User Failed", error);
      throw error;
   }
}
