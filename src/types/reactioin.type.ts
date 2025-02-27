export type TCreateReactionArticleReq = { reactionType: number; articleId: number };

export type TReactionArticle = {
   id: number;
   reactionType: number;
   userId: number;
   articleId: number;
   deletedBy: number;
   isDeleted: boolean;
   deletedAt: string;
   createdAt: string;
   updatedAt: string;
};
