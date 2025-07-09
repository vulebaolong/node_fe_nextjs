"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import { TRes, TResAction, TResPagination } from "@/types/app.type";
import { TComment, TCreateCommentReq } from "@/types/comment.type";
import api from "../core.api";

export async function createCommentAction(payload: TCreateCommentReq): Promise<TResAction<TComment | null>> {
    try {
        const result = await api.post<TRes<TComment>>(ENDPOINT.COMMENT, payload);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}

export async function getCommentByArticleAction(query: string): Promise<TResAction<TResPagination<TComment> | null>> {
    try {
        const result = await api.get<TRes<TResPagination<TComment>>>(`${ENDPOINT.COMMENT}?${query}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}