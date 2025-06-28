"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes, TResPagination } from "@/types/app.type";
import { TListPermissionByRole } from "@/types/permission.type";

export async function getListPermissionByRoleAction(roleId: string) {
   try {
      const { data } = await api.get<TRes<TResPagination<TListPermissionByRole>>>(`${ENDPOINT.LIST_PERMISSION_BY_ROLE}/${roleId}?pageSize=100`);
      return data;
   } catch (error) {
      console.error("Permission Group By Module failed:", error);
      throw error;
   }
}
