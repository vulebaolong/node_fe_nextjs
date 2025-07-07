"use client";

import { useFindOneFriend, useFriendStatus } from "@/api/tantask/friend.tanstack";
import { useDetailUser } from "@/api/tantask/user.tanstack";
import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import Paper from "@/components/custom/paper/PaperCustom";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { addChatOpened, emitToEvent, listenToEvent, removeEventListener } from "@/helpers/chat.helper";
import { getAccessToken } from "@/helpers/cookies.helper";
import { resError } from "@/helpers/function.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { TSocketRes } from "@/types/base.type";
import { TCreateRoomReq, TCreateRoomRes } from "@/types/chat.type";
import { TfriendshipAction, TStatusFriend, TStatusResult } from "@/types/friend.type";
import { Box, Button, Center, Container, Group, Stack, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function getFriendAction(info: { _id?: string }, detailUser: { _id?: string }, findOneFriend: any): TStatusResult {
    const isSender = findOneFriend?.userId === info?._id;
    const status = findOneFriend?.status as TStatusFriend | undefined;

    let nextStatus: TStatusFriend = "pending";
    let text = "Kết bạn";
    let disabled = false;

    const daysPassed = findOneFriend?.updatedAt ? (Date.now() - new Date(findOneFriend.updatedAt).getTime()) / (1000 * 3600 * 24) : 8; // Nếu không có updatedAt thì mặc định qua hạn

    if (!info?._id || !detailUser?._id) {
        return { nextStatus, text: "Đăng nhập để kết bạn", disabled: true };
    }

    if (isSender) {
        // Người gửi
        switch (status) {
            case "pending":
                text = "Đã gửi";
                disabled = true;
                break;
            case "accepted":
                nextStatus = "removed";
                text = "Huỷ kết bạn";
                break;
            case "declined":
                if (daysPassed < 7) {
                    text = "Đã từ chối";
                    disabled = true;
                } else {
                    nextStatus = "pending";
                    text = "Kết bạn";
                }
                break;
            case "removed":
                nextStatus = "pending";
                text = "Kết bạn";
                break;
            default:
                nextStatus = "pending";
                text = "Kết bạn";
                break;
        }
    } else {
        // Người nhận hoặc chưa từng gửi
        switch (status) {
            case "pending":
                nextStatus = "accepted";
                text = "Xác nhận";
                break;
            case "accepted":
                nextStatus = "removed";
                text = "Huỷ kết bạn";
                break;
            case "declined":
                if (daysPassed < 7) {
                    text = "Đã từ chối";
                    disabled = true;
                } else {
                    nextStatus = "pending";
                    text = "Kết bạn";
                }
                break;
            case "removed":
                nextStatus = "pending";
                text = "Kết bạn";
                break;
            default:
                nextStatus = "pending";
                text = "Kết bạn";
                break;
        }
    }

    return { nextStatus, text, disabled };
}

export default function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const info = useAppSelector((state) => state.user.info);
    const { socket } = useSocket();
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const detailUser = useDetailUser(id);
    const friendStatus = useFriendStatus();
    const findOneFriend = useFindOneFriend(id);
 
    useEffect(() => {
        listenToEvent(socket, SOCKET_CHAT_MES.RELOAD_STATUS_FRIEND_SHIP, () => {
            queryClient.invalidateQueries({ queryKey: [`find-one-friend`] });
        });

        return () => {
            removeEventListener(socket, SOCKET_CHAT_MES.RELOAD_STATUS_FRIEND_SHIP);
        };
    }, [socket]);

    const handleChat = async () => {
        if (!info?._id || !detailUser.data?._id || !socket) return;
        const accessToken = await getAccessToken();
        if (!accessToken) return toast.error("Vui lòng đăng nhập");

        setLoading(true);

        const payload: TCreateRoomReq = { targetUserIds: [detailUser.data?._id], accessToken };

        emitToEvent(socket, SOCKET_CHAT_MES.CREATE_ROOM, payload, (data: TSocketRes<TCreateRoomRes>) => {
            try {
                console.log({ CREATE_ROOM: { info, detailUser: detailUser.data, data } });
                if (data.status === "error") throw new Error(data.message);
                if (!data.data.chatGroupId) throw new Error("Be not response chatGroupId");

                addChatOpened(
                    {
                        chatGroupId: data.data?.chatGroupId,
                        chatGroupName: "",
                        chatGroupMembers: [
                            {
                                avatar: detailUser.data?.avatar,
                                fullName: detailUser.data?.fullName,
                                roleId: detailUser.data?.roleId,
                                userId: detailUser.data?._id,
                            },
                            {
                                avatar: info?.avatar,
                                fullName: info?.fullName,
                                roleId: info?.roleId,
                                userId: info?._id,
                            },
                        ],
                    },
                    () => {
                        queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
                        queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
                    }
                );
            } catch (error) {
                console.log(error);
                toast.error(resError(error, "Create Room Failed"));
            } finally {
                setLoading(false);
            }
        });
    };

    const actionInfo = getFriendAction(info || {}, detailUser.data || {}, findOneFriend.data);

    const handleMakeFriend = () => {
        if (!info || !detailUser.data) return;

        if (actionInfo.disabled) {
            toast.error(actionInfo.text);
            return;
        }
        const payload: TfriendshipAction = {
            userId: info._id,
            friendId: detailUser.data._id,
            status: actionInfo.nextStatus,
        };
        friendStatus.mutate(payload, {
            onSuccess: () => {
                let mes = `Đã gửi lời mời kết bạn`;
                if (actionInfo.nextStatus === "accepted") mes = `Đã chấp nhận kết bạn`;
                if (actionInfo.nextStatus === "removed") mes = `Đã xoá bạn`;
                toast.success(mes);
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: [`find-one-friend`] });
            },
        });
    };

    const handleDisabledButtonAddFriend = () => actionInfo.disabled;
    const handleTextButtonAddFriend = () => actionInfo.text;

    return (
        <>
            <Container py={100}>
                <Stack>
                    <Paper shadow="lg" radius="lg" withBorder p={80} pt={100} bg="var(--mantine-color-body)">
                        <Stack>
                            <Center>
                                <Avatar avatar={detailUser.data?.avatar} fullName={detailUser.data?.fullName} size={120} radius={120} mx="auto" />
                            </Center>

                            <Box>
                                <Center>
                                    <Text truncate maw={300} fz="lg" fw={500} mt="md">
                                        {detailUser.data?.fullName}
                                    </Text>
                                </Center>

                                <Text ta="center" c="dimmed" fz="sm">
                                    {detailUser.data?.email}
                                </Text>

                                <Center mt={10}>
                                    <Badge user={detailUser.data} />
                                </Center>
                            </Box>
                            <Center>
                                <Group>
                                    <Button
                                        disabled={handleDisabledButtonAddFriend()}
                                        loading={
                                            friendStatus.isPending || findOneFriend.isLoading || findOneFriend.isPending || findOneFriend.isFetching
                                        }
                                        onClick={handleMakeFriend}
                                    >
                                        {handleTextButtonAddFriend()}
                                    </Button>
                                    <Button loading={loading} onClick={handleChat} variant="default">
                                        Nhắn tin
                                    </Button>
                                </Group>
                            </Center>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </>
    );
}
