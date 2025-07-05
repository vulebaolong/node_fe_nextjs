import { Logo } from "@/components/logo/Logo";
import ModalSearchUser from "@/components/modal/modal-search-user/ModalSearchUser";
import UserMenuLoginYes from "@/components/user-menu/UserMenuLoginYes";
import { Button, Center, Drawer, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

type TProps = {
    opened: boolean;
    close: () => void;
};

export default function DrawerNavbar({ opened, close }: TProps) {
    // const router = useRouter();
    // const t = useTranslations();
    const [openedSearchUser, handleSearchUser] = useDisclosure(false);

    return (
        <>
            <Drawer offset={8} radius="lg" size="100%" opened={opened} onClose={close}>
                <Stack>
                    <Center>
                        <Logo />
                    </Center>
                    <Center>
                        <Button
                            onClick={() => {
                                handleSearchUser.open();
                                // close();
                            }}
                            c={"dimmed"}
                            leftSection={<IconSearch size={16} />}
                            variant="default"
                            radius="xl"
                            size="md"
                            w={`100%`}
                        >
                            <Text size="sm" fw={400}>
                                Tìm kiếm người dùng
                            </Text>
                        </Button>
                    </Center>
                    <UserMenuLoginYes onClick={close} />
                </Stack>
            </Drawer>
            <ModalSearchUser
                opened={openedSearchUser}
                close={() => {
                    handleSearchUser.close();
                    close();
                }}
            />
        </>
    );
}
