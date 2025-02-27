export type TRes<T> = {
   status: string;
   statusCode: number;
   message: string;
   data: T;
};

export type TResPagination<T> = {
   status: string;
   statusCode: number;
   message: string;
   data: {
      page: number;
      pageSize: number;
      totalPage: number;
      totalItem: number;
      items: T;
   };
};
