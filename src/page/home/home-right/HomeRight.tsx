"use client";

import { useFindAllChatGroupMany, useFindAllChatGroupOne } from "@/api/tantask/user.tanstack";
import Avatar from "@/components/avatar/Avatar";
import ModalCreateChatGroup from "@/components/modal/modal-create-chat-group/ModalCreateChatGroup";
import NodataOverlay from "@/components/no-data/NodataOverlay";
import ChatGroupSkeleton from "@/components/skeletons/ChatGroupSkeleton";
import TagUser from "@/components/tag-user/TagUser";
import { addChatOpened } from "@/helpers/chat.helper";
import { animationList } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { TChatGroup } from "@/types/chat.type";
import { Box, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

type TProps = {
    onClose?: () => void;
};

export default function HomeRight({ onClose }: TProps) {
    const t = useTranslations(`home-right`);
    const userId = useAppSelector((state) => state.user.info?.id);
    const findAllChatGroupOne = useFindAllChatGroupOne();
    const findAllChatGroupMany = useFindAllChatGroupMany();
    const queryClient = useQueryClient();
    const [openedCreateChatGroup, handleModalCreateChatGroup] = useDisclosure(false);

    const handleClickChatGroup = (chatGroup: TChatGroup) => {
        if (onClose) onClose();
        addChatOpened(
            {
                chatGroupId: chatGroup.id,
                chatGroupName: chatGroup.name || "",
                chatGroupMembers: chatGroup.ChatGroupMembers.map((member) => ({
                    avatar: member.Users.avatar,
                    fullName: member.Users.fullName,
                    roleId: member.Users.roleId,
                    userId: member.Users.id,
                })),
            },
            () => {
                queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
                queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
            }
        );
    };

    const handleCreateChatGroup = () => {
        handleModalCreateChatGroup.open();
    };

    return (
        <>
            <Stack style={{ height: `100%` }}>
                {/* chat 1-1 */}
                <Stack gap={10} mih={`50%`}>
                    <Text opacity={0.7} fw={`bold`} fz={`md`}>
                        {t(`Contact person`)}
                    </Text>
                    <Stack
                        sx={{
                            overflow: "auto",
                            height: `100%`,
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            position: `relative`,
                            gap: 5,
                        }}
                    >
                        {findAllChatGroupOne.isPending && <ChatGroupSkeleton />}
                        <NodataOverlay
                            width={50}
                            visible={
                                !findAllChatGroupOne.isPending &&
                                (!findAllChatGroupOne.data || findAllChatGroupOne.data?.items?.length === 0 || findAllChatGroupOne.isError)
                            }
                        />
                        {(findAllChatGroupOne.data?.items || []).map((chatGroup, i) => {
                            const user = (chatGroup?.ChatGroupMembers || []).find((user) => user.userId !== userId);
                            console.log(user);
                            if (!user) return <Fragment key={i}></Fragment>;
                            return (
                                <Box
                                    key={i}
                                    onClick={() => {
                                        handleClickChatGroup(chatGroup);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                        ...animationList(i),
                                        "&:hover": { backgroundColor: `var(--mantine-color-gray-light-hover)` },
                                        transition: `background-color 0.2s ease`,
                                        padding: `5px`,
                                        borderRadius: `10px`,
                                    }}
                                >
                                    <TagUser fullName={user.Users?.fullName} avatar={user.Users?.avatar} />
                                </Box>
                            );
                        })}
                    </Stack>
                </Stack>

                {/* chat nhóm */}
                <Stack gap={10} mih={`50%`}>
                    <Text opacity={0.7} fw={`bold`} fz={`md`}>
                        Nhóm chát
                    </Text>
                    <Stack
                        sx={{
                            overflow: "auto",
                            height: `100%`,
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            gap: 5,
                            position: `relative`,
                        }}
                    >
                        {findAllChatGroupOne.isPending && <ChatGroupSkeleton mt={"48px"} />}
                        <NodataOverlay
                            width={50}
                            visible={
                                !findAllChatGroupMany.isPending &&
                                (!findAllChatGroupMany.data || findAllChatGroupMany.data?.items?.length === 0 || findAllChatGroupMany.isError)
                            }
                        />
                        {(findAllChatGroupMany.data?.items || []).map((chatGroup, i) => {
                            const user = (chatGroup?.ChatGroupMembers || []).find((user) => user.Users.id !== userId);
                            if (!user) return <Fragment key={i}></Fragment>;
                            return (
                                <Box
                                    key={i}
                                    onClick={() => {
                                        handleClickChatGroup(chatGroup);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                        ...animationList(i),
                                        "&:hover": { backgroundColor: `var(--mantine-color-gray-light-hover)` },
                                        transition: `background-color 0.2s ease`,
                                        padding: `5px`,
                                        borderRadius: `10px`,
                                    }}
                                >
                                    <Group wrap="nowrap" gap={5}>
                                        <Box sx={{ width: `38px`, height: `38px`, position: `relative`, flexShrink: 0 }}>
                                            {chatGroup.ChatGroupMembers.slice(0, 2).map((member, i) => {
                                                if (i === 0) {
                                                    return (
                                                        <Box key={i} sx={{ position: `absolute`, bottom: 0, left: 0, zIndex: 2 }}>
                                                            <Avatar
                                                                size={`sm`}
                                                                fullName={member.Users.fullName}
                                                                avatar={member.Users.avatar}
                                                                radius="xl"
                                                            />
                                                        </Box>
                                                    );
                                                } else {
                                                    return (
                                                        <Box key={i} sx={{ position: `absolute`, top: 0, right: 0, zIndex: 1 }}>
                                                            <Avatar
                                                                size={`sm`}
                                                                fullName={member.Users.fullName}
                                                                avatar={member.Users.avatar}
                                                                radius="xl"
                                                            />
                                                        </Box>
                                                    );
                                                }
                                            })}
                                        </Box>
                                        <Text truncate>{chatGroup.name}</Text>
                                    </Group>
                                </Box>
                            );
                        })}
                        <Box
                            onClick={handleCreateChatGroup}
                            sx={{
                                cursor: "pointer",
                                ...animationList(0),
                                "&:hover": { backgroundColor: `var(--mantine-color-gray-light-hover)` },
                                transition: `background-color 0.2s ease`,
                                padding: `5px`,
                                borderRadius: `10px`,
                            }}
                        >
                            <Group wrap="nowrap" gap={5}>
                                <Box
                                    sx={{
                                        width: `38px`,
                                        height: `38px`,
                                        position: `relative`,
                                        flexShrink: 0,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`,
                                        borderRadius: `50%`,
                                        backgroundColor: `var(--mantine-color-gray-light-hover)`,
                                    }}
                                >
                                    <IconPlus style={{ width: "60%", height: "60%" }} stroke={2.5} />
                                </Box>
                                <Text truncate>Tạo nhóm chát</Text>
                            </Group>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
            <ModalCreateChatGroup opened={openedCreateChatGroup} close={handleModalCreateChatGroup.close} />
        </>
    );
}
