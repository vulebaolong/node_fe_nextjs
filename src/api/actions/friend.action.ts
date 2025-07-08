"use server";

import { TRes, TResAction, TResPagination } from "@/types/app.type";
import api from "../core.api";
import { ENDPOINT } from "@/constant/endpoint.constant";
import { TFriendShip, TfriendshipAction } from "@/types/friend.type";

export async function friendStatusAction(payload: TfriendshipAction): Promise<TResAction<any | null>> {
   try {
      const result = await api.post<TRes<any>>(`${ENDPOINT.FRIEND_STATUS}`, payload);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function findOneFriendAction(payload: string): Promise<TResAction<TFriendShip | null>> {
   try {
      const result = await api.get<TRes<TFriendShip>>(`${ENDPOINT.FIND_ONE_FRIEND}/${payload}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function getMyFriendAction(query: string): Promise<TResAction<TResPagination<TFriendShip> | null>> {
   try {
      const result = await api.get<TRes<TResPagination<TFriendShip>>>(`${ENDPOINT.FRIEND_MY}?${query}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function getOtherFriendAction(query: string): Promise<TResAction<TResPagination<TFriendShip> | null>> {
   try {
      const result = await api.get<TRes<TResPagination<TFriendShip>>>(`${ENDPOINT.FRIEND_OTHER}${query}`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}