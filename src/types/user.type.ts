import { TCreateChatRes } from "./chat.type";
import { TRole } from "./role.type";

export type TUser = {
   id: number;
   email: string;
   fullName: string;
   avatar: any;
   facebookId: any;
   googleId: any;
   roleId: number;
   deletedBy: number;
   isDeleted: boolean;
   deletedAt: string;
   createdAt: string;
   updatedAt: string;
   Roles: TRole;
   GoogleAuthenticator: null | TGoogleAuthenTicator;
};

export type TSessionLogin = {
   session_login_id: number;
   device_name: string;
   is_active: boolean;
   created_at: string;
   updated_at: string;
};

export type TGoogleAuthenTicator = {
   isEnabled: boolean;
   created_at: string;
   updated_at: string;
};

export type TTwoFa = {
   is_2fa_enabled: boolean;
   created_at: string;
   updated_at: string;
};

export type TListUserChatRes = {
   chats_chats_user_id_recipientTousers?: TCreateChatRes[];
   chats_chats_user_id_senderTousers?: TCreateChatRes[];
   lastMessage: string;
} & TUser;

export type TResetPasswordReq = {
   code: string;
   email: string;
   password: string;
};

export type TSendEmailReq = {
   email: string;
};

export type TUploadAvatarLocalRes = {
   folder: string;
   filename: string;
   imgUrl: string;
};
