import { TReactionArticle } from "./reactioin.type";
import { TUser } from "./user.type";

export type TArticle = {
   id: number;
   title: any;
   content: string;
   imageUrl: any;
   views: number;
   userId: number;
   deletedBy: number;
   isDeleted: boolean;
   deletedAt: string;
   createdAt: string;
   updatedAt: string;
   Users: TUser
   Reactions_Articles: TReactionArticle[];
};
