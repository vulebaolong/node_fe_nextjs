import { CHAT_LIST_ITEM, SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { addChatGroup, emitToEvent, getChatListUser, listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { TChatListItem } from "@/types/chat.type";
import { Center, Divider, Loader, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import MessageHeader from "./message-header/MessageHeader";
import MessageInput from "./message-input/MessageInput";
import MessageList from "./message-list/MessageList";
import { TUser } from "@/types/user.type";
import { useQueryClient } from "@tanstack/react-query";

type TProps = {
   item: TChatListItem;
   i: number;
};

export default function ChatUserItem({ i, item }: TProps) {
   const { socket } = useSocket();
   const [chatGroupId, setChatGroupId] = useState<number | null>(null);
   const [onlyOne, setOnlyOne] = useState(1);
   const info = useAppSelector((state) => state.user.info);
   const queryClient = useQueryClient();

   useEffect(() => {
      if (socket && onlyOne === 1) {
         setOnlyOne((prev) => prev++);

         if (item.chatGroupId) {
            listenToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM_ONE, (data: { chatGroupId: number }) => {
               // có bao nhiêu ChatUserItem thì JOIN_ROOM_ONE sẽ chạy bấy nhiêu
               // vì là chat nhiều cũng lúc, nên nếu bật cùng lúc nhiều chat box sẽ bị tín hiệu cuối cùng ghi đè
               if (data.chatGroupId === item.chatGroupId) {
                  console.log({ [`REPLY - ${SOCKET_CHAT_MES.JOIN_ROOM_ONE}`]: data });
                  setChatGroupId(data.chatGroupId);
               }
            });
            emitToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM_ONE, { chatGroupId: item.chatGroupId });
         } else {
            listenToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM_FIRST, (data: { chatGroupId: number }) => {
               // vì chỉ có một chat box nên không được kiểm tra
               console.log({ [`REPLY - ${SOCKET_CHAT_MES.JOIN_ROOM_FIRST}`]: data }, item.chatGroupId);
               addChatGroup(item.id, data.chatGroupId, () => {
                  queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
                  queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
               });
               const chatListUserItem = getChatListUser(CHAT_LIST_ITEM);
               chatListUserItem.find((chatListItem: TChatListItem) => {
                  if (chatListItem.id === item.id && chatListItem.chatGroupId === data.chatGroupId) {
                     setChatGroupId(data.chatGroupId);
                  }
               });
            });
            emitToEvent(socket, SOCKET_CHAT_MES.JOIN_ROOM_FIRST, { userIdSender: info?.id, userIdRecipient: item.id });
         }
      }
      return () => {
         if (!socket) return;
         removeEventListener(socket, SOCKET_CHAT_MES.SEND_MESSAGE);
         removeEventListener(socket, SOCKET_CHAT_MES.JOIN_ROOM_FIRST);
         removeEventListener(socket, SOCKET_CHAT_MES.JOIN_ROOM_ONE);
      };
   }, [socket]);

   useEffect(() => {
      return () => {
         if (socket && item.chatGroupId) {
            socket.emit(SOCKET_CHAT_MES.LEAVE_ROOM, { chatGroupId: item.chatGroupId });
         }
      };
   }, []);

   return (
      <Stack
         gap={0}
         right={`${340 * (i + 1) - 250 + 10 * i}px`}
         sx={(_, u) => {
            return {
               width: `340px`,
               height: `455px`,
               position: `fixed`,
               bottom: 0,
               boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
               border: `1px solid var(--divider-size) var(--divider-border-style, solid) var(--divider-color)`,
               borderRadius: `10px`,
               [u.light]: {
                  backgroundColor: `var(--mantine-color-gray-2)`,
               },
               [u.dark]: {
                  backgroundColor: `var(--mantine-color-dark-6)`,
               },
               zIndex: 1,
            };
         }}
      >
         <MessageHeader item={item} />
         <Divider />
         {chatGroupId ? (
            <MessageList item={item} chatGroupId={chatGroupId} />
         ) : (
            <Center flex={1}>
               <Loader color={`#480303`} size={`md`} />
            </Center>
         )}
         <Divider />
         <MessageInput item={item} chatGroupId={chatGroupId} />
      </Stack>
   );
}
