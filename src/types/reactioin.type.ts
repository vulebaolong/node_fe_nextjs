import { TBaseTimestamps } from "./base.type";

export type TReactionType = "like" | "love" | "care" | "haha" | "wow" | "sad" | "angry";
export type TReactiontargetType = "article" | "comment"

export type TCreateReactionArticleReq = {
    targetType: TReactiontargetType;
    targetId: string;
    type: TReactionType;
};

export type TReaction = {
    id: string;
    targetType: TReactiontargetType;
    targetId: string;
    type: TReactionType;
} & TBaseTimestamps;
