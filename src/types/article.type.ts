import { TBaseTimestamps } from "./base.type";
import { TReactionType } from "./reactioin.type";
import { TUser } from "./user.type";

export type TArticle = {
    _id: string;
    content: string;
    imageUrl: string;
    viewCount: number;
    commentCount: number;
    userId: string;
    isPublish: boolean;
    Users: TUser;
    reaction: TReactionType | null
} & TBaseTimestamps;
