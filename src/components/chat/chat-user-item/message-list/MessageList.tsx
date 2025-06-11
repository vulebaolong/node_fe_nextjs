import Nodata from "@/components/no-data/Nodata";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useMessageListChat } from "@/tantask/chat.tanstacl";
import { TChatListItem, TPayloadData, TPayloadReceiveMessage } from "@/types/chat.type";
import { ActionIcon, Box, Center, Loader, Stack } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";
import Recipient from "../../message/recipient/Recipient";
import Sender from "../../message/sender/Sender";
import classes from "./MessageList.module.css";

type TProps = {
   item: TChatListItem;
   chatGroupId: number | null;
};

export default function MessageList({ item, chatGroupId }: TProps) {
   const [onlyOne, setOnlyOne] = useState(1);
   const [isOne, setIsOne] = useState(true);
   const [totalPage, setTotalPage] = useState(0);
   const [isNewMess, setIsNewMess] = useState(false);
   const [isLoadmore, setIsLoadmore] = useState(false);
   const [scrollPosition, setScrollPosition] = useState(0);

   const [messageList, setMessageList] = useState<TPayloadData[]>([]);
   const [page, setPage] = useState(1);
   const user = useAppSelector((state) => state.user.info);

   const messageListChat = useMessageListChat({
      page,
      filters: {
         chatGroupId,
      },
   });

   useEffect(() => {
      if (!messageListChat.data || !chatGroupId) return;
      const mesList = messageListChat.data.items.reverse();
      setMessageList((prev) => {
         setScrollPosition(targetRefContainer.current.scrollHeight);
         if (prev.length === 0) return mesList;
         return [...mesList, ...prev];
      });
   }, [messageListChat.data, chatGroupId]);

   useEffect(() => {
      if (messageListChat.data?.totalPage) {
         setTotalPage(messageListChat.data?.totalPage);
      } else {
         setTotalPage(totalPage);
      }
   }, [messageListChat.data?.totalPage]);

   const userId = useAppSelector((state) => state.user.info?.id);

   const targetRefContainer = useRef<any>(null);

   const { ref: refToShowButtonScroll, entry: entryButtonScroll } = useIntersection({
      root: targetRefContainer.current,
      threshold: 0,
   });
   const { ref: refLoadMore, entry: entryLoadMore } = useIntersection({
      root: targetRefContainer.current,
      threshold: 1,
   });

   const [isButtonScroll, setIsButtonScroll] = useState(false);
   useEffect(() => {
      if (entryButtonScroll?.isIntersecting === undefined) {
      } else if (entryButtonScroll.isIntersecting === false) {
         setIsButtonScroll(true);
      } else if (entryButtonScroll.isIntersecting === true) {
         setIsButtonScroll(false);
      }
   }, [entryButtonScroll?.isIntersecting]);

   useEffect(() => {
      if (messageList.length > 0) {
         if (isOne) {
            console.log(`Cuộn xuống cuối khi mới vào trang`);
            targetRefContainer.current.scrollTop = targetRefContainer.current.scrollHeight;
            setIsOne(false);
         }

         if (isLoadmore) {
            console.log(`Cuộn lại top-list-trước để loadmore`);
            targetRefContainer.current.scrollTop = targetRefContainer.current.scrollHeight - scrollPosition;
            // isLoadmore = false;
            setIsLoadmore(false);
         }

         const mesLast = messageList[messageList.length - 1];
         if (isNewMess) {
            if (mesLast.userIdSender === userId) {
               console.log(`Cuộn xuống cuối khi có tin nhắn mới - 1`);
               targetRefContainer.current.scrollTop = targetRefContainer.current.scrollHeight;
               // isNewMess = false;
               setIsNewMess(false);
            } else {
               if (!isButtonScroll && !entryLoadMore?.isIntersecting) {
                  console.log(`Cuộn xuống cuối khi có tin nhắn mới - 2`);
                  targetRefContainer.current.scrollTop = targetRefContainer.current.scrollHeight;
                  // isNewMess = false;
                  setIsNewMess(false);
               }
            }
         }
      }
   }, [messageList]);

   useEffect(() => {
      if (entryLoadMore?.isIntersecting) {
         if (messageList.length > 0 && !(page >= totalPage)) {
            // isLoadmore = true;
            setIsLoadmore(true);
            setPage(page + 1);
         }
      }
   }, [entryLoadMore?.isIntersecting]);

   const { socket } = useSocket();
   useEffect(() => {
      if (socket) {
         listenToEvent(socket, SOCKET_CHAT_MES.RECEIVE_MESSAGE, (data: TPayloadData) => {
            console.log({ RECEIVE_MESSAGE: data, chatGroupId, item });
            if (item.chatGroupId !== data.chatGroupId) return; // tránh trường hợp gửi message cho các box chat đang mở
            setIsNewMess(true);
            setMessageList((prev) => {
               if (prev === null) return [data];
               return [...prev, data];
            });
         });
      }
      return () => {
         if (socket) {
            // removeEventListener(socket, SOCKET_CHAT_MES.RECEIVE_MESSAGE);
            console.log({ RECEIVE_MESSAGE: chatGroupId, item });
         }
      };
   }, [socket, item]);

   const renderContent = () => {
      if (messageListChat.isLoading && messageList.length === 0) {
         return (
            <Center h={`100%`}>
               <Loader color={`#480303`} size={`md`} />
            </Center>
         );
      }

      if (!messageList || messageList.length === 0) {
         return (
            <Center h={`100%`}>
               <Nodata />
            </Center>
         );
      }

      return messageList.map((messageItem: TPayloadData, i: number) => {
         const isLast = i === messageList.length - 1;
         return (
            <Fragment key={i}>
               {messageItem.userIdSender === userId ? (
                  <Sender
                     refToShowButtonScroll={refToShowButtonScroll}
                     isLast={isLast}
                     messageItem={{
                        avatar: user?.avatar,
                        email: user?.fullName || `??`,
                        message: messageItem.messageText,
                        time: ``,
                        userId: messageItem.userIdSender,
                        roleId: user?.roleId || 0,
                     }}
                  />
               ) : (
                  <Recipient
                     refToShowButtonScroll={refToShowButtonScroll}
                     isLast={isLast}
                     messageItem={{
                        avatar: item.ava,
                        email: item.name || `??`,
                        message: messageItem.messageText,
                        time: ``,
                        userId: item.id,
                        roleId: item.roleId,
                     }}
                  />
               )}
            </Fragment>
         );
      });
   };

   return (
      <>
         <Stack ref={targetRefContainer} className={`${classes[`message-list`]}`}>
            <Box ref={refLoadMore} className={`${classes[`load-more`]}`}>
               {messageListChat.isLoading && messageList.length > 0 && (
                  <Box h={30}>
                     <Center h={`100%`}>
                        <Loader color={`#480303`} size={`xs`} />
                     </Center>
                  </Box>
               )}
            </Box>

            {renderContent()}

            {isButtonScroll && (
               <div className={`${classes[`back-to-bottom`]}`}>
                  <ActionIcon
                     onClick={() => {
                        targetRefContainer.current.scrollTop = targetRefContainer.current.scrollHeight;
                     }}
                     variant="white"
                     radius="xl"
                     style={{ cursor: "pointer" }}
                  >
                     <IconChevronDown color="black" style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
               </div>
            )}
         </Stack>
      </>
   );
}
