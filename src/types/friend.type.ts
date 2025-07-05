import { TBaseTimestamps } from "./base.type";

export type TFriendShip = {
    _id: string;
    userId: string;
    friendId: string;
    status: TStatusFriend;
} & TBaseTimestamps;

export type TfriendshipAction = {
    userId: string;
    friendId: string;
    status?: TStatusFriend;
};

export type TStatusResult = {
    nextStatus: TStatusFriend;
    text: string;
    disabled: boolean;
};

export type TStatusFriend = "pending" | "accepted" | "declined" | "removed";
