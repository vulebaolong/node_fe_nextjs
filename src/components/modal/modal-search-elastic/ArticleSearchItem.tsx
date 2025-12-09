import { ROUTER_CLIENT } from "@/constant/router.constant";
import useRouter from "@/hooks/use-router-custom";
import { Badge, Box, Center, Group, Image, Stack, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

type TArticleSource = {
    id: number;
    title: string | null;
    content: string;
    imageUrl: string | null;
    views: number;
    userId: number;
    createdAt: string;
};

type TProps = {
    article: TArticleSource;
    index: number;
    onClick?: () => void;
};

export default function ArticleSearchItem({ article, index, onClick }: TProps) {
    const router = useRouter();

    const handleClick = () => {
        // router.push(`${ROUTER_CLIENT.ARTICLE}/${article.id}`);
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
            <Group gap="md" wrap="nowrap" align="flex-start">
                <Box
                    sx={{
                        flexShrink: 0,
                        borderRadius: `8px`,
                        overflow: `hidden`,
                        border: `1px solid var(--mantine-color-default-border)`,
                        width: 100,
                        height: 70,
                        backgroundColor: article.imageUrl ? 'transparent' : `var(--mantine-color-default)`,
                    }}
                >
                    {article.imageUrl ? (
                        <Image
                            src={article.imageUrl}
                            alt={article.title || "Article"}
                            width={100}
                            height={70}
                            fit="cover"
                        />
                    ) : (
                        <Center h={70} w={100}>
                            <Image
                                src="/images/logo/logo-192x192.png"
                                alt="Logo"
                                width={50}
                                height={50}
                                fit="contain"
                            />
                        </Center>
                    )}
                </Box>
                <Stack gap={6} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={8} wrap="nowrap" align="center">
                        <Text size="sm" fw={600} lineClamp={1} c="bright" style={{ flex: 1, minWidth: 0 }}>
                            {article.title || "Untitled Article"}
                        </Text>
                        <Badge size="xs" variant="light" color="teal">
                            Article
                        </Badge>
                    </Group>
                    <Text size="xs" c="dimmed" lineClamp={2} style={{ lineHeight: 1.4 }}>
                        {article.content}
                    </Text>
                    <Group gap={6} mt={2}>
                        <IconEye size={16} stroke={1.5} color="var(--mantine-color-dimmed)" />
                        <Text size="xs" c="dimmed" fw={500}>
                            {article.views.toLocaleString()} views
                        </Text>
                    </Group>
                </Stack>
            </Group>
        </Box>
    );
}
