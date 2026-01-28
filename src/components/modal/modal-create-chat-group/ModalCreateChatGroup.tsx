import { useSearchNameUser } from "@/api/tantask/user.tanstack";
import NodataOverlay from "@/components/no-data/NodataOverlay";
import TagUser from "@/components/tag-user/TagUser";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent } from "@/helpers/chat.helper";
import { getAccessToken } from "@/helpers/cookies.helper";
import { resError } from "@/helpers/function.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { TSocketRes } from "@/types/base.type";
import { TCreateRoomReq, TCreateRoomRes } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Button, Group, Input, LoadingOverlay, Modal, Paper, Stack, Text } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
            onSuccess: () => {
                // console.log(data);
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
        if (chatGroupName.trim() === "") return toast.warning("Vui lòng nhập tên nhóm");
        if (userSelected.length < 2) return toast.warning("Vui lòng chọn ít nhất 2 người");

        const targetUserIds = userSelected.map((u) => u.id);
        setLoading(true);

        const accessToken = await getAccessToken();

        const payload: TCreateRoomReq = { targetUserIds: targetUserIds, name: chatGroupName, accessToken: accessToken || "" };
        emitToEvent(socket, SOCKET_CHAT_MES.CREATE_ROOM, payload, (data: TSocketRes<TCreateRoomRes>) => {
            try {
                console.log({ CREATE_ROOM: { data } });
                if (data.status === "error") throw new Error(data.message);
                if (!data.data.chatGroupId) throw new Error("Be not response chatGroupId");
                toast.success(data.message);

                close();
                setChatGroupName("");
                setUserSelected([]);
                queryClient.invalidateQueries({ queryKey: [`chat-group-list`] });
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
            size="md"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
            withCloseButton={false}
            styles={{ body: { padding: 10 } }}
        >
            <Stack gap="md">
                {/* TITLE */}
                <Text fw={600} fz={18}>
                    Create Group Chat
                </Text>

                {/* GROUP NAME */}
                <Paper withBorder p="sm" radius={"lg"}>
                    <Text fz={14} fw={500}>
                        Group Name
                    </Text>
                    <Input radius={"md"} placeholder="Type group name..." value={chatGroupName} onChange={(e) => setChatGroupName(e.target.value)} />
                </Paper>

                {/* SELECTED MEMBERS */}
                <Paper withBorder p="sm" radius={"lg"}>
                    <Stack gap={20}>
                        <Stack gap={5}>
                            <Text fz={14} fw={500}>
                                Selected Members ({userSelected.length})
                            </Text>
                            {userSelected.length === 0 ? (
                                <Text c="dimmed" fz={12}>
                                    No members selected
                                </Text>
                            ) : (
                                <Group gap={6} sx={{ flexWrap: "wrap" }}>
                                    {userSelected.map((user, i) => (
                                        <Group key={i} gap={5} sx={{ flexWrap: "nowrap" }}>
                                            <TagUser sizeAvatar="sm" fullName={user.fullName} avatar={user.avatar} />
                                            <ActionIcon variant="default" radius="xl" size="xs" onClick={() => handleRemoveUser(user)}>
                                                <IconX size={12} stroke={1.5} />
                                            </ActionIcon>
                                        </Group>
                                    ))}
                                </Group>
                            )}
                        </Stack>

                        {/* SEARCH USER */}
                        <Stack gap={5}>
                            <Text fz={14} fw={500}>
                                Add Members
                            </Text>
                            <Input
                                radius={"md"}
                                value={search}
                                onChange={handleChange}
                                leftSection={<IconSearch size={16} />}
                                placeholder="Search users..."
                            />

                            {/* RESULTS */}
                            <Stack
                                sx={{
                                    minHeight: 120,
                                    maxHeight: 300,
                                    overflowY: "auto",
                                    padding: "4px",
                                    position: "relative",
                                }}
                                gap={3}
                            >
                                <LoadingOverlay visible={searchNameUser.isPending} zIndex={1000} overlayProps={{ radius: "sm", bg: `transparent` }} />

                                <NodataOverlay
                                    width={60}
                                    visible={!searchNameUser.isPending && (!searchNameUser.data?.items?.length || searchNameUser.isError)}
                                />

                                {searchNameUser.data?.items?.map((user, i) => {
                                    if (user.id === id) return null;
                                    const isSelected = userSelected.some((u) => u.id === user.id);
                                    return (
                                        <Box
                                            key={i}
                                            onClick={() => {
                                                setUserSelected((prev) => (isSelected ? prev.filter((x) => x.id !== user.id) : [...prev, user]));
                                            }}
                                            sx={{
                                                padding: "6px",
                                                borderRadius: 6,
                                                cursor: "pointer",
                                                background: isSelected ? "var(--mantine-color-blue-light)" : "transparent",
                                                "&:hover": {
                                                    background: "var(--mantine-color-default-hover)",
                                                },
                                            }}
                                        >
                                            <TagUser sizeAvatar="sm" fullName={user.fullName} avatar={user.avatar} />
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>

                {/* ACTION BUTTONS */}
                <Group mt={4}>
                    <Button variant="default" onClick={close}>
                        Đóng
                    </Button>
                    <Button onClick={handleCreateChatGroup} loading={loading} disabled={!chatGroupName || userSelected.length === 0}>
                        Tạo nhóm
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
