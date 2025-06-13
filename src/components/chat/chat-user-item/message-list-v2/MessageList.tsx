import NodataOverlay from "@/components/no-data/NodataOverlay";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { listenToEvent } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useGetChatMessage } from "@/tantask/chat.tanstacl";
import { TChatListItem, TPayloadData } from "@/types/chat.type";
import { LoadingOverlay } from "@mantine/core";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import RecipientMessageItem from "../../message/recipient/recipient-message-item/RecipientMessageItem";
import SenderMessageItem from "../../message/sender/sender-message-item/SenderMessageItem";
import ScrollToBottom from "./ScrollToBottom";
import { multiRAF } from "@/helpers/function.helper";

type TProps = {
   item: TChatListItem;
   chatGroupId: number | null;
};

export default function MessageList({ item, chatGroupId }: TProps) {
   const totalPageRef = useRef(0);
   const totalItemRef = useRef(0);
   const hasScrolledInitially = useRef(false);
   const [page, setPage] = useState(1);
   const [isAtBottom, setIsAtBottom] = useState(true);
   const [allMessages, setAllMessages] = useState<TPayloadData[]>([]);

   const virtuosoRef = useRef<VirtuosoHandle>(null);

   const user = useAppSelector((state) => state.user.info);

   const chatMessage = useGetChatMessage({
      page,
      filters: {
         chatGroupId,
      },
   });

   useEffect(() => {
      if (chatMessage.data?.totalPage) totalPageRef.current = chatMessage.data.totalPage;
      if (chatMessage.data?.totalItem)  totalItemRef.current = chatMessage.data.totalItem;
   }, [chatMessage.data?.totalPage, chatMessage.data?.totalItem]);

   // Prepend data vào allMessages
   useEffect(() => {
      if (!chatMessage.data?.items) return;
      const messages = chatMessage.data.items.reverse();
      setAllMessages((prev) => {
         if (prev.length === 0) return messages;
         return [...messages, ...prev];
      });
   }, [chatMessage.data?.items]);

   // Scroll đến đáy khi lần đầu
   useEffect(() => {
      if (!hasScrolledInitially.current && allMessages.length > 0) {
         hasScrolledInitially.current = true;

         const scrollToBottom = () => {
            virtuosoRef.current?.scrollToIndex({
               index: allMessages.length - 1,
               align: "end",
            });
         };

         multiRAF(scrollToBottom);
      }
   }, [allMessages.length]);

   // Nhận tin nhắn mới qua socket
   const { socket } = useSocket();
   useEffect(() => {
      if (!socket) return;

      listenToEvent(socket, SOCKET_CHAT_MES.SEND_MESSAGE, (data: TPayloadData) => {
         console.log({ SEND_MESSAGE: data, chatGroupId, item });
         if (item.chatGroupId !== data.chatGroupId) return;
         setAllMessages((prev) => {
            if (prev.length === 0) return [data];
            return [...prev, data];
         });
      });
   }, [socket]);

   // Kéo lên để load thêm
   const handleStartReached = () => {
      if (chatMessage.isFetching || page >= totalPageRef.current) return;
      setPage((prev) => prev + 1);
   };

   const firstItemIndex = Math.max(0, totalItemRef.current - allMessages.length);

   return (
      <div style={{ position: "relative", height: "400px" }}>
         <ScrollToBottom
            isAtBottom={isAtBottom}
            onClick={() => {
               virtuosoRef.current?.scrollToIndex({
                  index: allMessages.length - 1,
                  align: "end",
               });
            }}
         />

         <LoadingOverlay
            visible={chatMessage.isLoading && allMessages.length === 0}
            zIndex={1000}
            overlayProps={{ radius: "sm", bg: "transparent" }}
         />
         <NodataOverlay visible={!chatMessage.isLoading && allMessages.length === 0} />

         <Virtuoso
            ref={virtuosoRef}
            data={allMessages}
            firstItemIndex={firstItemIndex}
            style={{ height: "100%" }}
            itemContent={(index, messageItem: TPayloadData) => (
               <Fragment key={index}>
                  {messageItem.userIdSender === user?.id ? (
                     <SenderMessageItem
                        messageItem={{
                           avatar: user?.avatar,
                           email: user?.fullName || "??",
                           message: messageItem.messageText,
                           time: "",
                           userId: messageItem.userIdSender,
                           roleId: user?.roleId || 0,
                        }}
                     />
                  ) : (
                     <RecipientMessageItem
                        messageItem={{
                           avatar: item.ava,
                           email: item.name || "??",
                           message: messageItem.messageText,
                           time: "",
                           userId: item.id,
                           roleId: item.roleId,
                        }}
                     />
                  )}
               </Fragment>
            )}
            atBottomStateChange={setIsAtBottom}
            // startReached={handleStartReached}
         />
      </div>
   );
}
