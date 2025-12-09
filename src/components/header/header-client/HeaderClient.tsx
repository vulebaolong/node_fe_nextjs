"use client";

import { useGetInfoQuery } from "@/api/tantask/auth.tanstack";
import DrawerListChat from "@/components/drawer/drawer-list-chat/DrawerListChat";
import DrawerNavbar from "@/components/drawer/drawer-navbar/DrawerNavbar";
import { Logo } from "@/components/logo/Logo";
import ModalElasticSearch from "@/components/modal/modal-search-elastic/ModalSearchElastic";
import ModalSearchUser from "@/components/modal/modal-search-user/ModalSearchUser";
import UserControl from "@/components/user-control/UserControl";
import { MOBILE_HIDDEN_DESKTOP_VISIBLE, MOBILE_VISIBLE_DESKTOP_HIDDEN } from "@/constant/app.constant";
import { ActionIcon, Box, Burger, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMessengerFilled, IconSearch } from "@tabler/icons-react";

export default function HeaderClient() {
    // const t = useTranslations(`header`);
    const [opened, handleDrawerNavbar] = useDisclosure(false);
    const [openedSearchUser, handleSearchUser] = useDisclosure(false);
    const [openedListChat, handleDrawerListChat] = useDisclosure(false);
    // const router = useRouter();
    useGetInfoQuery();

    return (
        <>
            <Box
                component="header"
                sx={(_, u) => {
                    return {
                        [u.dark]: {
                            backgroundColor: `rgb(37, 39, 40)`,
                        },
                        [u.light]: {
                            backgroundColor: `white`,
                        },
                        height: `var(--height-header)`,
                        position: `fixed`,
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 101,
                        borderBottom: `1px solid var(--mantine-color-gray-light)`,
                        padding: `0px 20px`,
                    };
                }}
            >
                <Group
                    sx={{
                        justifyContent: `space-between`,
                        height: `100%`,
                        flexWrap: `nowrap`,
                    }}
                >
                    {/* left */}
                    <Group gap={2} wrap="nowrap">
                        <Box className={` ${MOBILE_VISIBLE_DESKTOP_HIDDEN}`}>
                            <Burger size={"sm"} opened={opened} onClick={handleDrawerNavbar.open} />
                        </Box>

                        <Group className={` ${MOBILE_HIDDEN_DESKTOP_VISIBLE}`}>
                            <Logo />
                            <Button
                                onClick={handleSearchUser.open}
                                c={"dimmed"}
                                leftSection={<IconSearch size={16} />}
                                variant="default"
                                radius="xl"
                                size="md"
                            >
                                <Text size="sm" fw={400}>
                                    Tìm kiếm người dùng
                                </Text>
                            </Button>
                        </Group>
                    </Group>

                    {/* right */}
                    <Group>
                        <Box className={`${MOBILE_HIDDEN_DESKTOP_VISIBLE}`}>
                            <UserControl type="client" />
                        </Box>
                        <ActionIcon
                            sx={{ cursor: "pointer" }}
                            onClick={handleDrawerListChat.open}
                            radius={"xl"}
                            className={`${MOBILE_VISIBLE_DESKTOP_HIDDEN}`}
                            variant="light"
                        >
                            <IconBrandMessengerFilled  style={{ width: "70%", height: "70%" }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Group>
                <Box
                    sx={{
                        position: `absolute`,
                        backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAOBAMAAAD3WtBsAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAD29va1cB7UAAAAB3RSTlMCCwQHGBAaZf6MKAAAABpJREFUCNdjSGNIY3BhCGUQBEJjIFQCQigAACyJAjLNW4w5AAAAAElFTkSuQmCC)`,
                        backgroundRepeat: `repeat-x`,
                        backgroundSize: `1px 7px`,
                        right: 0,
                        left: 0,
                        bottom: `-6px`,
                        height: `7px`,
                    }}
                />
            </Box>
            <DrawerNavbar opened={opened} close={handleDrawerNavbar.close} />
            <DrawerListChat opened={openedListChat} close={handleDrawerListChat.close} />
            {/* <ModalSearchUser opened={openedSearchUser} close={handleSearchUser.close} /> */}
            <ModalElasticSearch opened={openedSearchUser} close={handleSearchUser.close} />
        </>
    );
}
