import { logout } from "@/api/core.api";
import { USER_ADMIN } from "@/constant/app.constant";
import { ROUTER_CLIENT } from "@/constant/router.constant";
import { listMenu } from "@/constant/user-menu-login-yes.constant";
import useRouter from "@/hooks/use-router-custom";
import { useAppSelector } from "@/redux/hooks";
import { Divider, Group, Stack, Text } from "@mantine/core";
import { Dispatch, Fragment, SetStateAction } from "react";
import { toast } from "react-toastify";
import Avatar from "../avatar/Avatar";
import UserMenuItem from "./UserMenuItem";

type TProps = {
    setOpened?: Dispatch<SetStateAction<boolean>>;
    onClick?: () => void;
};

export default function UserMenuLoginYes({ onClick }: TProps) {
    const info = useAppSelector((state) => state.user.info);
    const router = useRouter();

    return (
        <Stack>
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
                onClick={() => {
                    router.push(ROUTER_CLIENT.PROFILE);
                    onClick?.();
                }}
            >
                <Avatar
                    size={`md`}
                    style={{ width: `38px`, height: `38px`, padding: `0px` }}
                    fullName={info?.fullName}
                    avatar={info?.avatar}
                    color="initials"
                />

                <Stack gap={0}>
                    <Text truncate sx={{ fontWeight: 900, fontSize: `16px`, maxWidth: `130px` }}>
                        {info?.fullName}
                    </Text>
                    <Text truncate sx={{ maxWidth: `130px`, fontSize: `12px`, opacity: 0.5 }}>
                        {info?.email}
                    </Text>
                </Stack>
            </Group>

            <Stack gap={2}>
                {listMenu.map((item, i) => {
                    if (item.label === "Admin" && info?.roleId !== USER_ADMIN) return null;
                    return (
                        <Fragment key={i}>
                            <UserMenuItem
                                item={item}
                                onClick={() => {
                                    if (i === listMenu.length - 1) {
                                        logout();
                                        return;
                                    }
                                    if (item.href) {
                                        router.push(item.href);
                                    } else {
                                        toast.info(`Coming Soon`);
                                    }
                                    onClick?.();
                                }}
                            />
                            {i + 2 === listMenu.length && <Divider my="xs" />}
                        </Fragment>
                    );
                })}
            </Stack>
        </Stack>
    );
}
