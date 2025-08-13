import NodataOverlay from "@/components/no-data/NodataOverlay";
import TagUser from "@/components/tag-user/TagUser";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent } from "@/helpers/chat.helper";
import { animationList, resError } from "@/helpers/function.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useSearchNameUser } from "@/api/tantask/user.tanstack";
import { TSocketRes } from "@/types/base.type";
import { TCreateRoomReq, TCreateRoomRes } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Button, Divider, Group, Input, LoadingOverlay, Modal, Stack, Text } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAccessToken } from "@/helpers/cookies.helper";

type TProps = {
    opened: boolean;
    close: () => void;
};

export default function ModalCreateChatGroup({ opened, close }: TProps) {
    const [search, setSearch] = useState("");
    const searchNameUser = useSearchNameUser();
    const id = useAppSelector((state) => state.user.info?.id);
    const [userSelected, setUserSelected] = useState<TUser[]>([]);
    const [chatGroupName, setChatGroupName] = useState<string>("");
    const { socket } = useSocket();
    const info = useAppSelector((state) => state.user.info);
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const handleSearch = useDebouncedCallback(async (query: string) => {
        if (query.trim() === "") return;
        searchNameUser.mutate(query, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }, 500);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
        handleSearch(event.currentTarget.value);
    };

    useEffect(() => {
        if (!opened) setSearch("");
    }, [opened]);

    const handleRemoveUser = (user: TUser) => {
        setUserSelected(userSelected.filter((u) => u.id !== user.id));
    };

    const handleCreateChatGroup = async () => {
        if (!socket || !info) return;
        const accessToken = await getAccessToken();

        if (!accessToken) return toast.error("Vui lòng đăng nhập");
        if (chatGroupName.trim() === "") return toast.warning("Vui lòng nhập tên nhóm");
        if (userSelected.length < 2) return toast.warning("Vui lòng chọn ít nhất 2 người");

        const targetUserIds = userSelected.map((u) => u.id);
        setLoading(true);

        const payload: TCreateRoomReq = { targetUserIds: targetUserIds, name: chatGroupName, accessToken };
        emitToEvent(socket, SOCKET_CHAT_MES.CREATE_ROOM, payload, (data: TSocketRes<TCreateRoomRes>) => {
            try {
                console.log({ CREATE_ROOM: { data } });
                if (data.status === "error") throw new Error(data.message);
                if (!data.data.chatGroupId) throw new Error("Be not response chatGroupId");
                toast.success(data.message);

                close();
                setChatGroupName("");
                setUserSelected([]);
                queryClient.invalidateQueries({ queryKey: [`chat-group-list-many`] });
            } catch (error) {
                console.log({ CREATE_ROOM: { error } });
                toast.error(resError(error, "Create Room Failed"));
            } finally {
                setLoading(false);
            }
        });
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            size={`md`}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            styles={{
                body: {
                    padding: 10,
                },
            }}
            withCloseButton={false}
        >
            <Stack>
                <Input value={chatGroupName} onChange={(e) => setChatGroupName(e.target.value)} placeholder="Tên nhóm" />

                <Stack gap={5}>
                    <Text>Thành viên nhóm</Text>
                    <Group>
                        {userSelected.map((user, i) => {
                            return (
                                <Group key={i} sx={{ ...animationList(i), flexWrap: `nowrap`, gap: 5 }}>
                                    <Box maw={`380px`}>
                                        <TagUser sizeAvatar={`sm`} fullName={user.fullName} avatar={user.avatar} />
                                    </Box>
                                    <ActionIcon
                                        variant="default"
                                        radius={`xl`}
                                        size={`xs`}
                                        onClick={() => {
                                            handleRemoveUser(user);
                                        }}
                                    >
                                        <IconX width={`70%`} height={`70%`} stroke={1.5} />
                                    </ActionIcon>
                                </Group>
                            );
                        })}
                    </Group>
                    <Box>
                        <Input
                            value={search}
                            onChange={handleChange}
                            leftSection={<IconSearch size={16} />}
                            variant="unstyled"
                            placeholder="Tìm kiếm người dùng"
                        />
                        <Divider />
                        <Stack
                            sx={{
                                minHeight: `100px`,
                                maxHeight: `500px`,
                                overflowY: `scroll`,
                                overflowX: `hidden`,
                                position: `relative`,
                                padding: `5px`,
                            }}
                            gap={2}
                        >
                            <LoadingOverlay visible={searchNameUser.isPending} zIndex={1000} overlayProps={{ radius: "sm", bg: `transparent` }} />
                            <NodataOverlay
                                width={50}
                                visible={
                                    !searchNameUser.isPending &&
                                    (!searchNameUser.data || searchNameUser.data?.items?.length === 0 || searchNameUser.isError)
                                }
                            />
                            {searchNameUser.data?.items?.map((user, i) => {
                                if (user.id === id) return <Fragment key={i} />;
                                return (
                                    <Box
                                        key={i}
                                        onClick={() => {
                                            setUserSelected((prev) => {
                                                if (prev.length === 0) {
                                                    return [user];
                                                } else {
                                                    if (prev.includes(user)) {
                                                        return prev.filter((item) => item.id !== user.id);
                                                    } else {
                                                        return [...prev, user];
                                                    }
                                                }
                                            });
                                        }}
                                        sx={{
                                            ...animationList(i),
                                            padding: `5px`,
                                            cursor: "pointer",
                                            borderRadius: `5px`,
                                            "--button-hover": `var(--mantine-color-default-hover)`,
                                            "&:hover": {
                                                background: `var(--button-hover, var(--mantine-primary-color-filled-hover))`,
                                            },
                                        }}
                                    >
                                        <TagUser sizeAvatar={`sm`} fullName={user.fullName} avatar={user.avatar} />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>
                </Stack>

                <Group sx={{ justifyContent: `flex-end` }}>
                    <Button variant="default" onClick={close}>
                        Đóng
                    </Button>
                    <Button loading={loading} onClick={handleCreateChatGroup}>
                        Tạo nhóm
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
