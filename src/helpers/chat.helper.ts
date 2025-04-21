import { CHAT_LIST_BUBBLE, CHAT_LIST_ITEM } from "@/constant/chat.constant";
import { TChatListItem } from "@/types/chat.type";
import _ from "lodash";
import { Socket } from "socket.io-client";
import { logWithColor } from "./function.helper";

export const getChatListUser = (key: string) => {
   const stringLocal = localStorage.getItem(key);
   if (stringLocal === null) return [];

   const reuslt = JSON.parse(stringLocal);
   if (!_.isArray(reuslt)) return [];

   return reuslt;
};

export const addUserToChatList = (userNew: TChatListItem, onSuccess?: () => void) => {
   const chatListUserItem = getChatListUser(CHAT_LIST_ITEM);
   const chatListUserBubble = getChatListUser(CHAT_LIST_BUBBLE);
   const isAdd = [...chatListUserItem, ...chatListUserBubble].find((item: TChatListItem) => {
      return item.id === userNew.id;
   });

   if (isAdd === undefined) {
      if (chatListUserItem.length >= 2) {
         // Remove the first item in the list
         const userRemove = chatListUserItem.shift();
         chatListUserItem.push(userNew);
         chatListUserBubble.push(userRemove);
         localStorage.setItem(CHAT_LIST_ITEM, JSON.stringify(chatListUserItem));
         localStorage.setItem(CHAT_LIST_BUBBLE, JSON.stringify(chatListUserBubble));
      } else {
         // Add a new item to the list
         chatListUserItem.push(userNew);
         localStorage.setItem(CHAT_LIST_ITEM, JSON.stringify(chatListUserItem));
      }
   }

   if (onSuccess) onSuccess();
};

export const removeUserFromChatList = (userRemove: TChatListItem, key: string, onSuccess?: () => void) => {
   const listChat = getChatListUser(key);

   if (_.isArray(listChat)) {
      _.remove(listChat, (itemChat) => itemChat.id === userRemove.id);
      localStorage.setItem(key, JSON.stringify(listChat));
   }

   if (onSuccess) onSuccess();
};

export const openUserFromBuble = (userMove: TChatListItem, onSuccess?: () => void) => {
   removeUserFromChatList(userMove, CHAT_LIST_BUBBLE);
   addUserToChatList(userMove);
   if (onSuccess) onSuccess();
};

export function listenToEvent(socket: Socket, eventName: string, callback: (...args: any[]) => void) {
   socket?.on(eventName, callback);
   logWithColor.tag(`🟢 LISTENING - `, `green`).mes(eventName);
}

export function removeEventListener(socket: Socket, eventName: string, callback?: (...args: any[]) => void) {
   if (callback) {
      socket?.off(eventName, callback);
   } else {
      socket?.off(eventName);
   }
   logWithColor.tag(`🔴 REMOVED - `, `red`).mes(eventName);
}

export function emitToEvent(socket: Socket, eventName: string, payload: any) {
   socket?.emit(eventName, payload);
   logWithColor.tag(`🔵 EMIT - `, `blue`).mes(eventName);
}