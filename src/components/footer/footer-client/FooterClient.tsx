"use client";

import { ActionIcon, Box, Container, Group, rem, Text } from "@mantine/core";
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import useRouter from "@/hooks/use-router-custom";
import { Logo } from "../../logo/Logo";

const data = [
    {
        title: "About",
        links: [
            { label: "Features", link: "#" },
            { label: "Pricing", link: "#" },
            { label: "Support", link: "#" },
            { label: "Forums", link: "#" },
        ],
    },
    {
        title: "Project",
        links: [
            { label: "Contribute", link: "#" },
            { label: "Media assets", link: "#" },
            { label: "Changelog", link: "#" },
            { label: "Releases", link: "#" },
        ],
    },
    {
        title: "Community",
        links: [
            { label: "Join Discord", link: "#" },
            { label: "Follow on Twitter", link: "#" },
            { label: "Email newsletter", link: "#" },
            { label: "GitHub discussions", link: "login" },
        ],
    },
];

export default function FooterClient() {
    const router = useRouter();

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                sx={{
                    display: "block",
                    fontSize: "var(--mantine-font-size-sm)",
                    paddingTop: rem(3),
                    paddingBottom: rem(3),
                    "&:hover": {
                        textDecoration: "underline",
                    },
                }}
                key={index}
                onClick={() => {
                    router.push(link.link);
                }}
                style={{ cursor: `pointer` }}
            >
                {link.label}
            </Text>
        ));

        return (
            <Box sx={{ width: rem(160) }} key={group.title}>
                <Text
                    sx={{
                        fontSize: "var(--mantine-font-size-lg)",
                        fontWeight: 700,
                        marginBottom: "calc(var(--mantine-spacing-xs) / 2)",
                    }}
                >
                    {group.title}
                </Text>
                {links}
            </Box>
        );
    });

    return (
        <Box
            component="footer"
            sx={(_, u) => {
                return {
                    marginTop: rem(120),
                    paddingTop: `calc(var(--mantine-spacing-xl) * 2)`,
                    paddingBottom: `calc(var(--mantine-spacing-xl) * 2)`,
                    [u.dark]: {
                        backgroundColor: `var(--mantine-color-dark-6)`,
                        borderColor: `var(--mantine-color-dark-5)`,
                    },
                    [u.light]: {
                        backgroundColor: `var(--mantine-color-gray-0)`,
                        borderColor: `var(--mantine-color-gray-2)`,
                    },
                };
            }}
        >
            <Container
                sx={(_, u) => {
                    return {
                        display: "flex",
                        justifyContent: "space-between",
                        [u.smallerThan("sm")]: {
                            flexDirection: "column",
                            alignItems: "center",
                        },
                    };
                }}
            >
                <Box
                    sx={(_, u) => {
                        return {
                            maxWidth: rem(300),
                            [u.smallerThan("sm")]: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            },
                        };
                    }}
                >
                    <Logo />
                    <Text
                        size="xs"
                        c="dimmed"
                        sx={(_, u) => {
                            return {
                                marginTop: rem(5),
                                [u.smallerThan("sm")]: {
                                    marginTop: "var(--mantine-spacing-xs)",
                                    textAlign: "center",
                                },
                            };
                        }}
                    >
                        Build fully functional accessible web applications faster than ever
                    </Text>
                </Box>
                <Box
                    sx={(_, u) => {
                        return {
                            display: "flex",
                            flexWrap: "wrap",
                            [u.smallerThan("sm")]: {
                                display: "none",
                            },
                        };
                    }}
                >
                    {groups}
                </Box>
            </Container>
            <Container
                sx={(_, u) => {
                    return {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "var(--mantine-spacing-xl)",
                        paddingTop: "var(--mantine-spacing-xl)",
                        paddingBottom: "var(--mantine-spacing-xl)",
                        [u.dark]: {
                            borderColor: `${rem(1)} solid var(--mantine-color-dark-4)`,
                        },
                        [u.light]: {
                            borderColor: `${rem(1)} solid var(--mantine-color-gray-2)`,
                        },
                        [u.smallerThan("sm")]: {
                            flexDirection: "column",
                        },
                    };
                }}
            >
                <Text c="dimmed" size="sm">
                    © 2020 mantine.dev. All rights reserved.
                </Text>

                <Group
                    sx={(_, u) => {
                        return {
                            gap: 0,
                            justifyContent: "flex-end",
                            flexWrap: "nowrap",
                            [u.smallerThan("sm")]: {
                                marginTop: "var(--mantine-spacing-xs)",
                            },
                        };
                    }}
                >
                    <ActionIcon size="lg" color="gray" variant="subtle" radius="xl">
                        <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle" radius="xl">
                        <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle" radius="xl">
                        <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </Box>
    );
}
