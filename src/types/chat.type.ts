import { ChatGroup } from "./chat-group.type";

export type TCreateChatReq = {
   userIdRecipient: number;
   message: string;
};

export type TCreateChatRes = TAllmessage & {
   deletedBy: number;
   isDeleted: boolean;
   deletedAt: string;
   createdAt: string;
   updatedAt: string;
};

export type TListChatRes = TCreateChatRes;

export type TChatListItem = {
   id: number;
   name: string;
   ava: string;
   roleId: number;
   chatGroupId?: number;
   chatGroup?: ChatGroup;
};

export type TPayloadReceiveMessage = {
   roomId: number;
   payload: TAllmessage;
};

export type TAllmessage = {
   messageText: string;
   userIdSender: number;
   chatGroupId: number;
   createdAt: string;
};

export type TMessageItem = {
   message: string;
   avatar: string | undefined
   fullName: string | undefined
   userId: number;
   roleId: number;
   createdAt: string;
};

export type TStateChat = {
   chatGroupId: number;
   chatGroupName: string;
   chatGroupMembers: TStateChatMember[];
};
export type TStateChatMember = {
   userId: number;
   fullName: string;
   avatar: string;
   roleId: number;
};
