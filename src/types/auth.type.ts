import { TUser } from "./user.type";

export type TRegisterReq = {
   fullName: string;
   email: string;
   password: string;
};

export type TRegisterRes = TUser;

export type TLoginFormReq = {
   email: string;
   password: string;
};

export type TLogin2FaReq = {
   email: string;
   password: string;
   token: string;
};

export type TLoginRes = {
   accessToken: string;
   refreshToken: string;
   deviceId: string;
};

export interface ISessionUser {
   access_token: string;
   refresh_token: string;
}
