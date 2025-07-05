export type TBaseTimestamps = {
   isDeleted: boolean;
   createdAt: string;
   updatedAt: string;
};

export type TSocketRes<T> = {
   status: string;
   message: string;
   data: T;
};
