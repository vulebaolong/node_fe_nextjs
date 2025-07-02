"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "../core.api";
import { TRes, TResAction, TResPagination } from "@/types/app.type";
import { TListPermissionByRole } from "@/types/permission.type";

export async function getListPermissionByRoleAction(roleId: string): Promise<TResAction<TResPagination<TListPermissionByRole> | null>> {
   try {
      const result = await api.get<TRes<TResPagination<TListPermissionByRole>>>(`${ENDPOINT.LIST_PERMISSION_BY_ROLE}/${roleId}?pageSize=100`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}
