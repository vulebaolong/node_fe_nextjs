import { CHAT_BUBBLE, CHAT_OPENED } from "@/constant/chat.constant";
import { TStateChat } from "@/types/chat.type";
import _ from "lodash";
import { logWithColor } from "./function.helper";

export const getChatOpened = (key: string): TStateChat[] => {
   const stringLocal = localStorage.getItem(key);
   if (stringLocal === null) return [];

   const reuslt = JSON.parse(stringLocal);
   if (!_.isArray(reuslt)) return [];

   return reuslt;
};

export const addChatOpened = (stateChatNew: TStateChat, onSuccess?: () => void) => {
   const chatListOpened = getChatOpened(CHAT_OPENED);
   const chatListBubble = getChatOpened(CHAT_BUBBLE);

   // kiểm tra xem chatGroupId đã tồn tại hay chưa
   const isAdd = [...chatListOpened, ...chatListBubble].find((stateChat: TStateChat) => {
      return stateChat.chatGroupId === stateChatNew.chatGroupId;
   });

   // nếu chatGroupId chưa tồn tại thì thêm mới
   if (isAdd === undefined) {
      if (chatListOpened.length >= 2) {
         // xoá phần tử đầu tiên trong chatListOpened
         const itemOpenedremove = chatListOpened.shift();

         // thêm phần tử mới vào cuối chatListOpened
         chatListOpened.push(stateChatNew);

         // thêm phần tử được xoá từ chatListOpened vào cuối chatListBubble
         if (itemOpenedremove) chatListBubble.push(itemOpenedremove);

         localStorage.setItem(CHAT_OPENED, JSON.stringify(chatListOpened));
         localStorage.setItem(CHAT_BUBBLE, JSON.stringify(chatListBubble));
      } else {
         // thêm phần tử mới vào cuối chatListOpened
         chatListOpened.push(stateChatNew);
         localStorage.setItem(CHAT_OPENED, JSON.stringify(chatListOpened));
      }
   }

   if (onSuccess) onSuccess();
};

export const removeChatOpened = (stateChat: TStateChat, key: string, onSuccess?: () => void) => {
   const listChatOpened = getChatOpened(key);

   if (_.isArray(listChatOpened)) {
      _.remove(listChatOpened, (itemChat) => itemChat.chatGroupId === stateChat.chatGroupId);
      localStorage.setItem(key, JSON.stringify(listChatOpened));
   }

   if (onSuccess) onSuccess();
};

export const openChatFromBuble = (stateChat: TStateChat, onSuccess?: () => void) => {
   removeChatOpened(stateChat, CHAT_BUBBLE);
   addChatOpened(stateChat);
   if (onSuccess) onSuccess();
};

export function listenToEvent(socket: any, eventName: string, callback: (...args: any[]) => void) {
   socket?.on(eventName, callback);
   logWithColor.sln().mes("🟢 LISTENING - ", { color: "green" }).mes(eventName, { color: "cyan", fontWeight: "bold" }).eln();
}

export function removeEventListener(socket: any, eventName: string, callback?: (...args: any[]) => void) {
   if (callback) {
      socket?.off(eventName, callback);
   } else {
      socket?.off(eventName);
   }
   logWithColor.sln().mes("🔴 REMOVED - ", { color: "red" }).mes(eventName, { color: "cyan", fontWeight: "bold" }).eln();
}

export function emitToEvent(socket: any, eventName: string, payload: any, cb?: (data: any) => void) {
   socket?.emit(eventName, payload, cb);
   logWithColor
      .sln()
      .mes("🔵 EMIT - ", { color: "blue" })
      .mes(eventName, { color: "cyan", fontWeight: "bold" })
      .mes(payload, { color: "gray", fontSize: "12px" })
      .eln();
}
