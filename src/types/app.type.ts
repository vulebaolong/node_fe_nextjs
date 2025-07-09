export type TRes<T> = {
   status: string;
   statusCode: number;
   message: string;
   data: T;
};

export type TResPagination<T> = {
   page: number;
   pageSize: number;
   totalPage: number;
   totalItem: number;
   items: T[];
};

export type TResAction<T> = {
   status: "success" | "error";
   message: string;
   data: T;
};

