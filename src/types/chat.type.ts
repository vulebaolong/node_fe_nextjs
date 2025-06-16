import { ChatGroup, ChatGroupMember } from "./chat-group.type";

export type TCreateChatReq = {
   userIdRecipient: number;
   message: string;
};

export type TCreateChatRes = TPayloadData &  {
   deletedBy: number
   isDeleted: boolean
   deletedAt: string
   createdAt: string
   updatedAt: string
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
   payload: TPayloadData;
};

export type TPayloadData = {
   messageText: string;
   userIdSender: number;
   chatGroupId: number;
   createdAt: string
};

export type TMessageItem = {
   message: string;
   avatar: string | null;
   email: string;
   userId: number;
   roleId: number;
   time: string;
};
