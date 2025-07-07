import { createArticleAction, getListArticleAction } from "@/api/actions/article.action";
import { TPayloadTable } from "@/components/custom/table/TableCustom";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetListArticle = (payload: TPayloadTable) => {
    return useQuery({
        queryKey: ["get-list-article", payload],
        queryFn: async () => {
             const { pagination, filters, sort } = payload;
            const { pageIndex, pageSize } = pagination;
            const query = `page=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}&sortBy=${sort?.sortBy}&isDesc=${sort?.isDesc}`;

            const { data, status, message } = await getListArticleAction(query);
            if (status === "error" || data === null) throw new Error(message);

            console.log({ useGetListArticle: data });
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
