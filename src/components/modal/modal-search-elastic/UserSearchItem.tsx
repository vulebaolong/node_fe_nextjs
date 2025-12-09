import Avatar from "@/components/avatar/Avatar";
import { ROUTER_CLIENT } from "@/constant/router.constant";
import useRouter from "@/hooks/use-router-custom";
import { Badge, Box, Group, Stack, Text } from "@mantine/core";
import { IconMail, IconUser } from "@tabler/icons-react";

type TUserSource = {
    id: number;
    email: string;
    fullName: string;
    avatar: string | null;
    createdAt: string;
};

type TProps = {
    user: TUserSource;
    index: number;
    onClick?: () => void;
};

export default function UserSearchItem({ user, index, onClick }: TProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`${ROUTER_CLIENT.USER}/${user.id}`);
        onClick?.();
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                padding: `12px`,
                cursor: "pointer",
                borderRadius: `8px`,
                "&:hover": {
                    backgroundColor: `var(--mantine-color-default-hover)`,
                },
            }}
        >
            <Group gap="md" wrap="nowrap">
                <Box
                    sx={{
                        flexShrink: 0,
                    }}
                >
                    <Avatar size={40} fullName={user.fullName} avatar={user.avatar as any} />
                </Box>
                <Stack gap={6} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={8} wrap="nowrap">
                        <IconUser size={15} stroke={1.5} color="var(--mantine-color-dimmed)" />
                        <Text size="sm" fw={600} lineClamp={1} c="bright" style={{ flex: 1, minWidth: 0 }}>
                            {user.fullName}
                        </Text>
                        <Badge size="xs" variant="light" color="blue">
                            User
                        </Badge>
                    </Group>
                    <Group gap={6}>
                        <IconMail size={15} stroke={1.5} color="var(--mantine-color-dimmed)" />
                        <Text size="xs" c="dimmed" lineClamp={1}>
                            {user.email}
                        </Text>
                    </Group>
                </Stack>
            </Group>
        </Box>
    );
}
