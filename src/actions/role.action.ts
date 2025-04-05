"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TTogglePermissionReq } from "@/types/role.type";
import { TListRoleRes } from "@/types/role.type copy";

export async function getListRoleAction(query: string) {
   try {
      const { data } = await api.get<TResPagination<TListRoleRes[]>>(`${ENDPOINT.ROLE}?${query}`);
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
