import { TBaseTimestamps } from "./base.type";
import { TUser } from "./user.type";

export type TAllmessage = {
   messageText: string;
   userIdSender: string;
   chatGroupId: string;
   createdAt: string;
};

export type TMessageItem = {
   message: string;
   avatar: string | undefined;
   fullName: string | undefined;
   userId: string;
   roleId: string;
   createdAt: string;
};

export type TStateChat = {
   chatGroupId: string;
   chatGroupName: string;
   chatGroupMembers: TStateChatMember[];
};
export type TStateChatMember = {
   userId: string;
   fullName: TUser["fullName"];
   avatar: TUser["avatar"];
   roleId: string;
};

export type TChatGroup = {
   _id: string;
   name?: string;
   ownerId: string;
   Owner: TUser;
   ChatGroupMembers: TChatGroupMember[];
} & TBaseTimestamps;

export type TChatGroupMember = {
   _id: string;
   userId: string;
   chatGroupId: string;
   Users: TUser;
   createdAt: string;
   updatedAt: string;
} & TBaseTimestamps;


export type TCreateRoomRes = {
    chatGroupId: string;
    chatGroupName: string | null;
};
