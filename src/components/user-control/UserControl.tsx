"use client";

import { useGetInfoQuery } from "@/api/tantask/auth.tanstack";
import { useAppSelector } from "@/redux/hooks";
import { Box, Group, Menu, Stack, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
import Avatar from "../avatar/Avatar";
import UserMenuLoginNo from "../user-menu/UserMenuLoginNo";
import UserMenuLoginYes from "../user-menu/UserMenuLoginYes";

type TProps = {
    colorText?: string;
    type: "admin" | "client";
};

export default function UserControl({ colorText = "black", type }: TProps) {
    useGetInfoQuery();
    const info = useAppSelector((state) => state.user.info);
    const [opened, setOpened] = useState(false);

    return (
        <Menu shadow="md" width={220} opened={opened} onChange={setOpened}>
            <Menu.Target>
                {info ? (
                    <Box>
                        {type === "client" ? (
                            <Avatar size={32} sx={{ cursor: `pointer` }} fullName={info.fullName} avatar={info.avatar} color="initials" />
                        ) : (
                            <Group
                                sx={{
                                    flexWrap: `nowrap`,
                                    padding: `5px 10px`,
                                    width: `100%`,
                                    borderRadius: `10px`,
                                    "&:hover": { backgroundColor: `var(--mantine-color-gray-light-hover)` },
                                    cursor: `pointer`,
                                    transition: `background-color 0.2s ease`,
                                    gap: 10,
                                }}
                            >
                                <Avatar size={32} sx={{ cursor: `pointer` }} fullName={info.fullName} avatar={info.avatar} color="initials" />
                                <Stack gap={0}>
                                    <Text truncate sx={{ fontWeight: 900, fontSize: `16px`, maxWidth: `130px` }}>
                                        {info?.fullName}
                                    </Text>
                                    <Text truncate sx={{ maxWidth: `130px`, fontSize: `12px`, opacity: 0.5 }}>
                                        {info?.email}
                                    </Text>
                                </Stack>
                            </Group>
                        )}
                    </Box>
                ) : (
                    <Group
                        gap={2}
                        sx={(theme, u) => ({
                            cursor: "pointer",
                            transition: "color 150ms ease",
                            [u.light]: {
                                color: colorText,
                            },
                            [u.dark]: {
                                color: "white",
                            },
                            "&:hover": {
                                color: theme.colors[theme.primaryColor][5],
                            },
                        })}
                    >
                        <IconUser size={16} stroke={1} />
                        <Text style={{ fontWeight: 400, fontSize: `14px` }}>Tài khoản</Text>
                    </Group>
                )}
            </Menu.Target>

            <Menu.Dropdown sx={{ borderRadius: `16px`, padding: `8px` }}>
                {info ? <UserMenuLoginYes onClick={() => setOpened(false)} /> : <UserMenuLoginNo onClick={() => setOpened(false)} />}
            </Menu.Dropdown>
        </Menu>
    );
}
