export type TBaseTimestamps = {
   createdAt: string;
   updatedAt: string;
};

export type TSocketRes<T> = {
   status: string;
   message: string;
   data: T;
};
