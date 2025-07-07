import { Logo } from "@/components/logo/Logo";
import { breakpoint } from "@/layouts/admin-layout/AdminLayout";
import { Burger, Group } from "@mantine/core";

type TProps = {
    mobileOpened: boolean;
    desktopOpened: boolean;
    toggleMobile: () => void;
    toggleDesktop: () => void;
};

export default function HeaderAdmin({ mobileOpened, desktopOpened, toggleMobile, toggleDesktop }: TProps) {
    return (
        <Group h="100%" px="md" justify="space-between">
            <Group h="100%">
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom={breakpoint} size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom={breakpoint} size="sm" />
                <Logo width={40} />
            </Group>
        </Group>
    );
}
