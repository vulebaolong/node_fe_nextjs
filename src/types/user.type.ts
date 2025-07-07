import { TBaseTimestamps } from "./base.type";
import { TRole } from "./role.type";

export type TUser = {
   _id: string;
   email: string;
   fullName: string;
   avatar?: string;
   googleId?: string;
   roleId: string;
   Roles: TRole;
   isTotp: boolean;
} & TBaseTimestamps;

export type TUploadAvatarLocalRes = {
   folder: string;
   filename: string;
   imgUrl: string;
};

export type TEditProfileReq = {
   id: string;
   fullName: string;
};