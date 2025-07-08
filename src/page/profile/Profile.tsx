"use client";

// import ArticleList from "@/components/article/ArticleList";
// import FriendList from "@/components/friend/FriendList";
// import ProfileFriend from "@/components/profile/ProfileFriend";
// import ProfileCoverPhoto from "@/components/profile/ProfileCoverPhoto";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { useAppSelector } from "@/redux/hooks";
import { Box, Container, Stack } from "@mantine/core";

export function Profile() {
    const info = useAppSelector((state) => state.user.info);

    return (
        <>
            <Box pb={100} pt={50}>
                {/* <Container size={`xl`}>
                    <Box>
                        <ProfileCoverPhoto />
                    </Box>
                </Container> */}
                <Container mt={10}>
                    <Stack>
                        <ProfileInfo info={info} type="my" />
                        {/* <Box
                            sx={(theme, u) => {
                                return {
                                    display: `grid`,
                                    gap: theme.spacing.lg,
                                    [u.largerThan("md")]: {
                                        gridTemplateColumns: `0.35fr 0.65fr`,
                                    },
                                    [u.smallerThan("md")]: {
                                        gridTemplateColumns: `1fr`,
                                    },
                                };
                            }}
                        >
                            <Box>
                                <FriendList height="calc(100vh - (82px + 20px + 20px + var(--height-header))" type="my" />
                            </Box>
                            <Box>
                                <ArticleList height="calc(100vh - (82px + 20px + 20px + var(--height-header))" type="my" />
                            </Box>
                        </Box> */}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
