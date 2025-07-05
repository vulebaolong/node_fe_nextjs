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

export type TLoginFormGaReq = {
    token: string;
} & TLoginFormReq;

export type TLoginGoogleGaReq = {
    email: string;
    token: string;
};

export type TLogin2FaReq = {
    email: string;
    password: string;
    token: string;
};

export type TLoginRes = {
    accessToken: string | null;
    refreshToken: string | null;
    isTotp: true | null;
};

export interface ISessionUser {
    access_token: string;
    refresh_token: string;
}

export type TStepLogin = "login-form" | "login-google-authentication";

export type TPayloadLoginGoogleAuthenticator = {
    email: string;
    password: string | null;
    token: string | null;
    type: "email/pass" | "totp";
};

export type TLoginGoogleWithTotpReq = {
    email: string;
    token: string;
};