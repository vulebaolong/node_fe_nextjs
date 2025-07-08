import { createArticleAction, getAllArticleAction, getMyArticleAction, getOtherArticleAction } from "@/api/actions/article.action";
import { TPayloadTable } from "@/components/custom/table/TableCustom";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllArticle = (payload: TPayloadTable) => {
    return useQuery({
        queryKey: ["get-all-article", payload],
        queryFn: async () => {
            const { pagination, filters, sort } = payload;
            const { pageIndex, pageSize } = pagination;
            const query = `page=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}&sortBy=${sort?.sortBy}&isDesc=${sort?.isDesc}`;

            const { data, status, message } = await getAllArticleAction(query);
            if (status === "error" || data === null) throw new Error(message);

            console.log({ useGetAllArticle: data });
            return data;
        },
    });
};

export const useGetMyArticle = (payload: TPayloadTable) => {
    return useQuery({
        queryKey: ["get-my-article", payload],
        queryFn: async () => {
            const { pagination, filters, sort } = payload;
            const { pageIndex, pageSize } = pagination;
            const query = `page=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}&sortBy=${sort?.sortBy}&isDesc=${sort?.isDesc}`;

            const { data, status, message } = await getMyArticleAction(query);
            if (status === "error" || data === null) throw new Error(message);

            console.log({ useGetMyArticle: data });
            return data;
        },
    });
};

export const useGetOtherArticle = (payload: TPayloadTable & { id?: string }) => {
    return useQuery({
        queryKey: ["get-other-article", payload],
        queryFn: async () => {
            const { pagination, filters, sort, id } = payload;
            const { pageIndex, pageSize } = pagination;
            console.log({ id });
            if (!id) throw new Error("ID is required");
            const query = `/${id}?page=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}&sortBy=${sort?.sortBy}&isDesc=${
                sort?.isDesc
            }`;

            const { data, status, message } = await getOtherArticleAction(query);
            if (status === "error" || data === null) throw new Error(message);

            console.log({ useGetOtherArticle: data });
            return data;
        },
    });
};

export const useCreateArticle = () => {
    return useMutation({
        mutationFn: async (payload: FormData) => {
            const { data, status, message } = await createArticleAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            return data;
        },
    });
};
