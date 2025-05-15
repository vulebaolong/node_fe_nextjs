"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TRole, TTogglePermissionReq } from "@/types/role.type";
import { TListRoleRes } from "@/types/role.type copy";

export async function getListRoleAction(query: string) {
   try {
      const { data } = await api.get<TRes<TResPagination<TListRoleRes>>>(`${ENDPOINT.ROLE}?${query}`);
      console.log({ data });
      return data;
   } catch (error) {
      console.error("Get List Role failed:", error);
      throw error;
   }
}

export async function getRolesAction(query: string) {
   try {
      const { data } = await api.get<TRes<TResPagination<TListRoleRes>>>(`${ENDPOINT.ROLE}?${query}`);
      console.log({ data });
      return data;
   } catch (error) {
      console.error("Get List Role failed:", error);
      throw error;
   }
}

export async function getDetailRoleAction(roleId: string) {
   try {
      const { data } = await api.get<TRes<TListRoleRes>>(`${ENDPOINT.ROLE}/${roleId}`);
      return data;
   } catch (error) {
      console.error("Get Detail Role failed:", error);
      throw error;
   }
}

export async function getTogglePermissionAction(payload: TTogglePermissionReq) {
   try {
      const { data } = await api.post<TRes<any>>(`${ENDPOINT.TOGGLE_PERMISSION}`, payload);
      return data;
   } catch (error) {
      console.error("Get Detail Role failed:", error);
      throw error;
   }
}

export type TUpdateRoleAction = TRole;
export const updateRolesAction = async (payload: TUpdateRoleAction) => {
   try {
      const { data } = await api.patch<TRes<TRole>>(`${ENDPOINT.ROLE}/${payload.id}`, payload);
      return data;
   } catch (error) {
      console.error("Get Detail Role failed:", error);
      throw error;
   }
};