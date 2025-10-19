// helpers/build-article-query.ts

import { TQuery } from "@/types/app.type";

export function buildQueryString(input: TQuery): string {
    const { pagination, filters, sort } = input;

    const search = new URLSearchParams();

    // pagination
    const page = pagination?.page;
    const pageSize = pagination?.pageSize;
    const afterUUIDv7 = (pagination as any)?.afterUUIDv7;
    const beforeUUIDv7 = (pagination as any)?.beforeUUIDv7;

    if (page !== undefined && page !== null) search.set("page", String(page));
    if (pageSize !== undefined && pageSize !== null) search.set("pageSize", String(pageSize));

    if (afterUUIDv7) search.set("afterUUIDv7", String(afterUUIDv7));
    if (beforeUUIDv7) search.set("beforeUUIDv7", String(beforeUUIDv7));

    // filters (object -> JSON)
    if (filters && typeof filters === "object" && Object.keys(filters).length > 0) {
        for (const [field, value] of Object.entries(filters)) {
            if (value === null || value === undefined || value === "") {
                delete filters[field];
            }
        }
        search.set("filters", JSON.stringify(filters));
    }

    // sort
    if (sort?.sortBy) search.set("sortBy", String(sort.sortBy));
    if (typeof sort?.isDesc === "boolean") search.set("isDesc", String(sort.isDesc));

    return search.toString();
}
