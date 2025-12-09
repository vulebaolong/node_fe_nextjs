import { TRes, TResAction, TResPagination } from "@/types/app.type";
import { TUser } from "@/types/user.type";
import api from "../core.api";
import { ENDPOINT } from "@/constant/endpoint.constant";

type TElasticSearchParams = {
    search: string;
    page?: number;
    pageSize?: number;
};

export async function elasticSearchAction({ search, page = 1, pageSize = 10 }: TElasticSearchParams): Promise<TResAction<TResPagination<any> | null>> {
    try {
        const result = await api.get<TRes<TResPagination<any>>>(`${ENDPOINT.ELASTIC_SEARCH}?search=${search}&page=${page}&pageSize=${pageSize}`);
        const { data } = result;
        return { status: "success", message: result.message, data: data };
    } catch (error: any) {
        return { status: "error", message: error?.message, data: null };
    }
}
