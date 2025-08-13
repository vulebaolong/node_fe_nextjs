"use client";

import NodataOverlay from "@/components/no-data/NodataOverlay";
import { multiRAF } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { useGetChatMessage } from "@/api/tantask/chat.tanstacl";
import { TAllmessage, TStateChat } from "@/types/chat.type";
import { Fragment, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import RecipientMessageItem from "../../message/recipient/RecipientMessageItem";
import SenderMessageItem from "../../message/sender/SenderMessageItem";
import LoadingGetMessage from "./LoadingGetMessage";
import ScrollToBottom from "./ScrollToBottom";

type TProps = {
    stateChat: TStateChat;
    dataSendMessage: TAllmessage;
};

export default function MessageList({ stateChat, dataSendMessage }: TProps) {
    const totalPageRef = useRef(0);
    const totalItemRef = useRef(0);
    const hasScrolledInitiallyRef = useRef(false);
    const shouldScrollRef = useRef(false);
    const isAtBottomRef = useRef(true);

    const [page, setPage] = useState(1);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [allMessages, setAllMessages] = useState<TAllmessage[]>([]);

    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const user = useAppSelector((state) => state.user.info);

    const chatMessage = useGetChatMessage({
        pagination: { pageIndex: page, pageSize: 10 },
        filters: { chatGroupId: stateChat.chatGroupId },
        sort: { sortBy: `createdAt`, isDesc: true },
    });

    useEffect(() => {
        if (chatMessage.data?.totalPage) totalPageRef.current = chatMessage.data.totalPage;
        if (chatMessage.data?.totalItem) totalItemRef.current = chatMessage.data.totalItem;
    }, [chatMessage.data?.totalPage, chatMessage.data?.totalItem]);
    useEffect(() => {
        isAtBottomRef.current = isAtBottom;
    }, [isAtBottom]);

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
        if (!hasScrolledInitiallyRef.current && allMessages.length > 0) {
            hasScrolledInitiallyRef.current = true;
            multiRAF(scrollToBottom);
        }
    }, [allMessages.length]);

    // Nhận tin nhắn mới qua socket
    useEffect(() => {
        if (!dataSendMessage?.chatGroupId) return;

        // 👉 Nếu bạn gửi => luôn scroll
        if (dataSendMessage.userIdSender === user?.id) {
            shouldScrollRef.current = true;
        }
        // 👉 Nếu người khác gửi và bạn đang ở cuối => scroll
        else if (isAtBottomRef.current) {
            shouldScrollRef.current = true;
        }

        setAllMessages((prev) => {
            if (prev.length === 0) return [dataSendMessage];
            return [...prev, dataSendMessage];
        });
    }, [dataSendMessage]);

    // Khi allMessages thay đổi → nếu có flag scroll thì scroll
    useEffect(() => {
        if (shouldScrollRef.current) {
            shouldScrollRef.current = false;
            multiRAF(scrollToBottom);
        }
    }, [allMessages.length]);

    // Kéo lên để load thêm
    const handleStartReached = () => {
        if (chatMessage.isFetching || page >= totalPageRef.current) return;
        setPage((prev) => prev + 1);
    };

    const scrollToBottom = () => {
        console.log("scroll to bottom");
        virtuosoRef.current?.scrollToIndex({
            index: allMessages.length - 1,
            align: "end",
        });
    };

    const firstItemIndex = Math.max(0, totalItemRef.current - allMessages.length);

    return (
        <div style={{ position: "relative", height: "100%" }}>
            <ScrollToBottom isAtBottom={isAtBottom} onClick={scrollToBottom} />
            <LoadingGetMessage isLoading={chatMessage.isLoading} />
            <NodataOverlay visible={!chatMessage.isLoading && allMessages.length === 0} />

            <Virtuoso
                ref={virtuosoRef}
                data={allMessages}
                firstItemIndex={firstItemIndex}
                style={{ height: "100%" }}
                itemContent={(index, messageItem: TAllmessage) => {
                    const userRecipient = stateChat.chatGroupMembers.find((member) => member.userId === messageItem.userIdSender);
                    return (
                        <Fragment key={index}>
                            {messageItem.userIdSender === user?.id ? (
                                <SenderMessageItem
                                    messageItem={{
                                        avatar: user?.avatar,
                                        message: messageItem.messageText,
                                        createdAt: messageItem.createdAt || "",
                                        userId: messageItem.userIdSender,
                                        roleId: user.roleId || "",
                                        fullName: user?.fullName,
                                    }}
                                />
                            ) : (
                                <RecipientMessageItem
                                    messageItem={{
                                        avatar: userRecipient?.avatar,
                                        fullName: userRecipient?.fullName,
                                        message: messageItem.messageText,
                                        createdAt: messageItem.createdAt || "",
                                        userId: userRecipient?.userId || "",
                                        roleId: userRecipient?.roleId || "",
                                    }}
                                />
                            )}
                        </Fragment>
                    );
                }}
                atBottomStateChange={setIsAtBottom}
                startReached={handleStartReached}
            />
        </div>
    );
}
