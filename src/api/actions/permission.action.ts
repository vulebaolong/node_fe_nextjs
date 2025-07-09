"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "../core.api";
import { TRes, TResAction, TResPagination } from "@/types/app.type";
import { TListPermissionByRole, TPermission } from "@/types/permission.type";

export async function getListPermissionByRoleAction(roleId: string): Promise<TResAction<TResPagination<TListPermissionByRole> | null>> {
   try {
      const result = await api.get<TRes<TResPagination<TListPermissionByRole>>>(`${ENDPOINT.LIST_PERMISSION_BY_ROLE}/${roleId}?pageSize=100`);
      const { data } = result;
      return { status: "success", message: result.message, data: data };
   } catch (error: any) {
      return { status: "error", message: error?.message, data: null };
   }
}

export async function getPermissionsAction(query: string): Promise<TResAction<TResPagination<TPermission> | null>> {
    try {
        const result = await api.get<TRes<TResPagination<TPermission>>>(`${ENDPOINT.PERMISSION}?${query}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export type TCreatePermissionAction = { name: string; endpoint: string; method: string; module: string };
export async function createPermissionsAction(payload: TCreatePermissionAction): Promise<TResAction<boolean | null>> {
    try {
        const result = await api.post<TRes<boolean>>(`${ENDPOINT.PERMISSION}`, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export type TUpdatePermissionAction = TPermission;
export const updatePermissionsAction = async (payload: TUpdatePermissionAction): Promise<TResAction<TPermission | null>> => {
    try {
        const result = await api.patch<TRes<TPermission>>(`${ENDPOINT.PERMISSION}/${payload._id}`, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
};

export async function deletePermissionsAction(payload: string): Promise<TResAction<boolean | null>> {
    try {
        const result = await api.delete<TRes<any>>(`${ENDPOINT.PERMISSION}/${payload}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}
