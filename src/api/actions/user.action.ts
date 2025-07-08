"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import { TRes, TResAction, TResPagination } from "@/types/app.type";
import { TChatGroup } from "@/types/chat.type";
import { TEditProfileReq, TUser } from "@/types/user.type";
import api from "../core.api";

export async function uploadAvatarLocalAction(payload: FormData): Promise<TResAction<boolean | null>> {
    try {
        const result = await api.post<TRes<boolean>>(ENDPOINT.UPLOAD_AVATAR_LOCAL, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function uploadAvatarCloudAction(payload: FormData): Promise<TResAction<boolean | null>> {
    try {
        const result = await api.post<TRes<boolean>>(ENDPOINT.UPLOAD_AVATAR_CLOUD, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function findAllUserAction(): Promise<TResAction<TResPagination<TUser> | null>> {
    try {
        const result = await api.get<TRes<TResPagination<TUser>>>(`${ENDPOINT.USER}?pageSize=100`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function findAllChatGroupOneAction(): Promise<TResAction<TResPagination<TChatGroup> | null>> {
    try {
        const result = await api.get<TRes<TResPagination<TChatGroup>>>(`${ENDPOINT.CHAT_GROUP}?pageSize=100&isOne=true`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function findAllChatGroupManyAction(): Promise<TResAction<TResPagination<TChatGroup> | null>> {
    try {
        const result = await api.get<TRes<TResPagination<TChatGroup>>>(`${ENDPOINT.CHAT_GROUP}?pageSize=100&isOne=false`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function getDetailUserAction(userId: string): Promise<TResAction<TUser | null>> {
    try {
        const result = await api.get<TRes<TUser>>(`${ENDPOINT.USER}/${userId}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function searchNameUserAction(filters: string): Promise<TResAction<TResPagination<TUser> | null>> {
    try {
        const queryFilters = { fullName: filters };
        const result = await api.get<TRes<TResPagination<TUser>>>(`${ENDPOINT.USER}?pageSize=100&page=1&filters=${JSON.stringify(queryFilters)}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function editProfileAction(payload: TEditProfileReq): Promise<TResAction<any | null>> {
    try {
        const result = await api.patch<TRes<any>>(`${ENDPOINT.USER}/${payload.id}`, { fullName: payload.fullName });
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}
