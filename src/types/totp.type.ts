export type TPayloadTotpSave = {
   token: string;
   secret: string;
};

export type TPayloadTotpDisable = {
   token: string;
};

export type TPayloadTotpVerify = {
   token: string;
};
