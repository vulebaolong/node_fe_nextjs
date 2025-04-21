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
};

export type TPayloadReceiveMessage = {
   roomId: string;
   payload: TPayloadData;
};

export type TPayloadData = {
   message: string;
   userId: number;
   roomId: string;
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
