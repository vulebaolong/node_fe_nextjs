import { useGetCommentByArticle } from "@/api/tantask/comment.tanstack";
import { formatLocalTime } from "@/helpers/function.helper";
import { typingText } from "@/helpers/motion.helper";
import { TArticle } from "@/types/article.type";
import { TListComment } from "@/types/comment.type";
import { Box, Group, Stack, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import { DataStateWrapper } from "../data-state-wrapper/DataStateWrapper";
import Nodata from "../no-data/Nodata";

type TProps = {
    article: TArticle;
    listComment: TListComment[];
    setListComment: Dispatch<SetStateAction<TListComment[]>>;
};

export default function CommentList({ article, listComment, setListComment }: TProps) {
    const [pagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [filtersValue] = useState({
        articleId: article.id,
    });

    const getCommentByArticle = useGetCommentByArticle({
        pagination: { pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize },
        filters: filtersValue,
        sort: { sortBy: `createdAt`, isDesc: true },
    });

    useEffect(() => {
        if (getCommentByArticle.data?.items) {
            setListComment(getCommentByArticle.data?.items);
        }
    }, [getCommentByArticle.data?.items]);

    return (
        <Stack py={10} gap={5}>
            <DataStateWrapper
                isLoading={getCommentByArticle.isLoading}
                isError={getCommentByArticle.isError}
                isEmpty={!getCommentByArticle.data || listComment.length === 0}
                noDataComponent={
                    <Stack
                        sx={{
                            height: `200px`,
                            alignItems: `center`,
                            justifyContent: `center`,
                        }}
                    >
                        <Box>
                            <Nodata />
                            <Text ta={`center`}>Hãy là người bình luận đầu tiên</Text>
                        </Box>
                    </Stack>
                }
            >
                {listComment.map((comment: TListComment, i) => {
                    return (
                        <Group key={i} sx={{ padding: `0px 10px`, alignItems: `start` }}>
                            <Avatar avatar={comment.Users.avatar} fullName={comment.Users.fullName} />
                            <Box>
                                <Box
                                    sx={(_, u) => {
                                        return {
                                            padding: `8px 12px`,
                                            borderRadius: `16px`,
                                            width: `fit-content`,
                                            [u.light]: {
                                                backgroundColor: `var(--mantine-color-gray-2)`,
                                            },
                                            [u.dark]: {
                                                backgroundColor: `var(--mantine-color-dark-6)`,
                                            },
                                        };
                                    }}
                                >
                                    <Text fz={`sm`} fw={600}>
                                        {comment.Users.fullName}
                                    </Text>
                                    <Text fz={`md`}>{comment.content}</Text>
                                </Box>
                                {comment.createdAt ? (
                                    <Group px={12}>
                                        <Text fz={`sm`} c={`dimmed`}>
                                            {formatLocalTime(comment.createdAt, `ago`)}
                                        </Text>
                                        <Text
                                            sx={{
                                                cursor: `pointer`,
                                                color: `var(--mantine-color-dimmed)`,
                                                transition: `all 0.2s ease`,
                                                position: "relative",
                                                "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    left: 0,
                                                    bottom: 0,
                                                    width: 0,
                                                    height: `1px`,
                                                    backgroundColor: `var(--mantine-color-text)`,
                                                    transition: "width 0.2s ease",
                                                },
                                                ":hover": {
                                                    color: `var(--mantine-color-primary)`,
                                                    "&::before": {
                                                        width: "100%",
                                                    },
                                                },
                                            }}
                                            fz={`sm`}
                                        >
                                            Thích
                                        </Text>
                                        <Text
                                            sx={{
                                                cursor: `pointer`,
                                                color: `var(--mantine-color-dimmed)`,
                                                transition: `all 0.2s ease`,
                                                position: "relative",
                                                "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    left: 0,
                                                    bottom: 0,
                                                    width: 0,
                                                    height: `1px`,
                                                    backgroundColor: `var(--mantine-color-text)`,
                                                    transition: "width 0.2s ease",
                                                },
                                                ":hover": {
                                                    color: `var(--mantine-color-primary)`,
                                                    "&::before": {
                                                        width: "100%",
                                                    },
                                                },
                                            }}
                                            fz={`sm`}
                                        >
                                            Trả lời
                                        </Text>
                                    </Group>
                                ) : (
                                    <>{typingText("Đang viết")}</>
                                )}
                            </Box>
                        </Group>
                    );
                })}
            </DataStateWrapper>
        </Stack>
    );
}
