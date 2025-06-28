"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TRole, TToggleRolePermissionReq, TToggleRolePermissionRes, TToggleRoleReq } from "@/types/role.type";

export async function getRolesAction(query: string) {
   try {
      const { data } = await api.get<TRes<TResPagination<TRole>>>(`${ENDPOINT.ROLE}?${query}`);
      console.log({ data });
      return data;
   } catch (error) {
      console.error("Get List Role failed:", error);
      throw error;
   }
}

export async function getDetailRoleAction(roleId: string) {
   try {
      const { data } = await api.get<TRes<TRole>>(`${ENDPOINT.ROLE}/${roleId}`);
      return data;
   } catch (error) {
      console.error("Get Detail Role failed:", error);
      throw error;
   }
}

export async function toggleRolePermissionAction(payload: TToggleRolePermissionReq) {
   try {
      const { data } = await api.post<TRes<TToggleRolePermissionRes>>(`${ENDPOINT.TOGGLE_ROLE_PERMISSION}`, payload);
      return data;
   } catch (error) {
      console.error("Toggle Permission failed:", error);
      throw error;
   }
}

export async function getToggleRoleAction(payload: TToggleRoleReq) {
   try {
      const { data } = await api.post<TRes<any>>(`${ENDPOINT.TOGGLE_ROLE}/${payload.roleId}`);
      return data;
   } catch (error) {
      console.error("Toggle Role failed:", error);
      throw error;
   }
}

export type TUpdateRoleAction = TRole;
export const updateRolesAction = async (payload: TUpdateRoleAction) => {
   try {
      const { data } = await api.patch<TRes<TRole>>(`${ENDPOINT.ROLE}/${payload._id}`, payload);
      return data;
   } catch (error) {
      console.error("Update Role failed:", error);
      throw error;
   }
};