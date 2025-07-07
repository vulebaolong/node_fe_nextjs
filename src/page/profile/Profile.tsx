"use client";

import ProfileArticle from "@/components/profile/ProfileArticle";
import ProfileCoverPhoto from "@/components/profile/ProfileCoverPhoto";
import ProfileFriend from "@/components/profile/ProfileFriend";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { useAppSelector } from "@/redux/hooks";
import { Box, Container, Stack } from "@mantine/core";

export function Profile() {
    const info = useAppSelector((state) => state.user.info);

    return (
        <>
            <Box pb={100} pt={50}>
                <Container size={`xl`}>
                    <Box>
                        <ProfileCoverPhoto />
                    </Box>
                </Container>
                <Container mt={10}>
                    <Stack>
                        <ProfileInfo info={info} />
                        <Box
                            sx={(theme, u) => {
                                return {
                                    display: `grid`,
                                    gap: theme.spacing.md,
                                    [u.largerThan("md")]: {
                                        gridTemplateColumns: `0.4fr 0.6fr`,
                                    },
                                    [u.smallerThan("md")]: {
                                        gridTemplateColumns: `1fr`,
                                    },
                                };
                            }}
                        >
                            <Box>
                                <ProfileFriend />
                            </Box>
                            <Box>
                                <ProfileArticle />
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
