import { useMutation } from "@tanstack/react-query";
import { elasticSearchAction } from "../actions/elastic-search.action";

type TElasticSearchParams = {
    search: string;
    page?: number;
    pageSize?: number;
};

export const useElasticSearch = () => {
    return useMutation({
        mutationFn: async (payload: TElasticSearchParams) => {
            const { data, status, message } = await elasticSearchAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useElasticSearch: data });
            return data;
        },
    });
};
