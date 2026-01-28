"use client";

import { TUser } from "@/types/user.type";
import { Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Avatar from "../avatar/Avatar";
import ButtonsFriend from "../buttons/ButtonsFriend";
import ModalEditAvatar from "../modal/modal-edit-avatar/ModalEditAvatar";
import ModalEditProfile from "../modal/modal-edit-profile/ModalEditProfile";

type TProps = {
    info: TUser | null;
    type: "my" | "other";
};

export default function ProfileInfo({ info, type }: TProps) {
    const [openedModalEditAvatar, handleModalEditAvatar] = useDisclosure(false);
    const [openedModalEditProfile, handleModalEditProfile] = useDisclosure(false);

    return (
        <>
            <Paper shadow="lg" radius="lg" withBorder p={20} bg="var(--mantine-color-body)">
                <Box
                    sx={(_, u) => {
                        return {
                            display: `flex`,
                            gap: `20px`,
                            [u.smallerThan("md")]: {
                                flexDirection: `column`,
                                alignItems: `center`,
                            },
                            [u.largerThan("md")]: {
                                flexDirection: `row`,
                                alignItems: `center`,
                                justifyContent: `start`,
                            },
                        };
                    }}
                >
                    <Avatar
                        onClick={type === "my" ? handleModalEditAvatar.open : undefined}
                        avatar={info?.avatar}
                        fullName={info?.fullName}
                        size={120}
                        radius={120}
                        sx={{ cursor: type === "my" ? `pointer` : `unset` }}
                    />

                    <Stack sx={{ flex: 1, gap: `10px` }}>
                        <Group>
                            <Text truncate maw={300} fz="h3" fw={"bold"}>
                                {info?.fullName}
                            </Text>
                        </Group>

                        <Text c="dimmed" fz="md">
                            {info?.email}
                        </Text>
                    </Stack>

                    {type === "my" ? (
                        <Button onClick={handleModalEditProfile.open} variant="default" size="xs" radius="xl">
                            Chỉnh sửa
                        </Button>
                    ) : (
                        <>{info && <ButtonsFriend detailUser={info} />}</>
                    )}
                </Box>
            </Paper>
            <ModalEditAvatar opened={openedModalEditAvatar} close={handleModalEditAvatar.close} />
            <ModalEditProfile opened={openedModalEditProfile} close={handleModalEditProfile.close} />
        </>
    );
}
