"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import { TRes, TResAction, TResPagination } from "@/types/app.type";
import { TRole, TToggleRolePermissionReq, TToggleRolePermissionRes, TToggleRoleReq } from "@/types/role.type";
import api from "../core.api";

export async function getRolesAction(query: string): Promise<TResAction<TResPagination<TRole> | null>> {
    try {
        const result = await api.get<TRes<TResPagination<TRole>>>(`${ENDPOINT.ROLE}?${query}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function getDetailRoleAction(roleId: string): Promise<TResAction<TRole | null>> {
    try {
        const result = await api.get<TRes<TRole>>(`${ENDPOINT.ROLE}/${roleId}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function toggleRolePermissionAction(payload: TToggleRolePermissionReq): Promise<TResAction<TToggleRolePermissionRes | null>> {
    try {
        const result = await api.post<TRes<TToggleRolePermissionRes>>(`${ENDPOINT.TOGGLE_ROLE_PERMISSION}`, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function getToggleRoleAction(payload: TToggleRoleReq): Promise<TResAction<any | null>> {
    try {
        const result = await api.post<TRes<any>>(`${ENDPOINT.TOGGLE_ROLE}/${payload.roleId}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export type TUpdateRoleAction = TRole;
export const updateRolesAction = async (payload: TUpdateRoleAction): Promise<TResAction<TRole | null>> => {
    try {
        const result = await api.patch<TRes<TRole>>(`${ENDPOINT.ROLE}/${payload._id}`, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
};

export type TCreateRoleAction = { name: string; description: string };
export async function createRolesAction(payload: TCreateRoleAction): Promise<TResAction<boolean | null>> {
    try {
        const result = await api.post<TRes<boolean>>(`${ENDPOINT.ROLE}`, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function deleteRolesAction(payload: string): Promise<TResAction<boolean | null>> {
    try {
        const result = await api.delete<TRes<any>>(`${ENDPOINT.ROLE}/${payload}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}
