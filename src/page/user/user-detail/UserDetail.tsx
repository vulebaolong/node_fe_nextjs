"use client";

import { useDetailUser } from "@/api/tantask/user.tanstack";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Box, Container, Stack } from "@mantine/core";
import { useParams } from "next/navigation";

export default function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const detailUser = useDetailUser(id);

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
                        {detailUser.data && <ProfileInfo info={detailUser.data} type="other" />}

                        {/* <Box
                            sx={(theme, u) => {
                                return {
                                    display: `grid`,
                                    gap: theme.spacing.md,
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
                                <ProfileFriend />
                            </Box>
                            <Box>
                                <ArticleList
                                    height="calc(100vh - (82px + 20px + 20px + var(--height-header))"
                                    type="other"
                                    id={detailUser.data?._id}
                                />
                            </Box>
                        </Box> */}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
