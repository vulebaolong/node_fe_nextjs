import { IconLogout, IconSettings } from "@tabler/icons-react";
import { ROUTER_CLIENT } from "./router.constant";

export const listMenu = [
    {
        label: "Setting",
        icon: <IconSettings size={16} />,
        href: ROUTER_CLIENT.SETTING,
    },
    {
        label: "Logout",
        icon: <IconLogout size={16} />,
        href: null,
    },
];
