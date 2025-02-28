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
   accessToken: string | null;
   refreshToken: string | null;
   isGoogleAuthenticator: boolean;
   deviceId: string;
};

export interface ISessionUser {
   access_token: string;
   refresh_token: string;
}

export type TStepLogin = "login-form" | "login-google-authentication";

export type TPayloadLoginGoogleAuthenticator = {
   email: string;
   password: string;
   token: string | null;
};
