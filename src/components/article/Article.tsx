"use client";

import { checkPathImage, formatLocalTime } from "@/helpers/function.helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SET_ARTICLE_DETAIL } from "@/redux/slices/article.slice";
import { TArticle } from "@/types/article.type";
import { Box, Button, Group, Image as ImageMantine, Stack, Text } from "@mantine/core";
import { IconMessageCircle, IconShare3 } from "@tabler/icons-react";
import Avatar from "../avatar/Avatar";
import { background1 } from "../provider/mantine/sx/background.sx";
import TextContent from "../text-content/TextContent";
import ButtonLike from "./button-like/ButtonLike";

type TProps = {
    article: TArticle;
    handleModalArticleDetail?: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    };
    type: "all" | "my" | "other";
};

export default function Article({ article, handleModalArticleDetail, type }: TProps) {
    const info = useAppSelector((state) => state.user.info);
    const dispatch = useAppDispatch();
    const handleClickComment = () => {
        dispatch(SET_ARTICLE_DETAIL(article));
        if (handleModalArticleDetail) handleModalArticleDetail.open();
    };
    return (
        <Box
            sx={(_, u) => {
                return {
                    ...background1(_, u),
                    borderRadius: handleModalArticleDetail ? `20px` : `0px`,
                    boxShadow: handleModalArticleDetail ? `0 1px 2px rgba(0, 0, 0, .2)` : `unset`,
                };
            }}
            mb={"lg"}
        >
            {/* info */}
            <Group justify="space-between" wrap="nowrap" px={10} py={15}>
                <Box style={{ flexShrink: 0 }}>
                    <Avatar
                        fullName={type === "my" ? info?.fullName : article.Users?.fullName}
                        avatar={type === "my" ? info?.avatar : article.Users?.avatar}
                    />
                </Box>
                <Stack gap={0} flex={1}>
                    <Text fw={`bold`}>{type === "my" ? info?.fullName : article.Users?.fullName}</Text>
                    <Text c={`dimmed`}>{formatLocalTime(article.createdAt, `ago`)}</Text>
                </Stack>

                {/* control */}
                {/* <Group style={{ flexShrink: 0 }}>
                    <ActionIcon variant="subtle" radius="xl">
                        <IconDots style={{ width: "70%", height: "70%" }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" radius="xl">
                        <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
                    </ActionIcon>
                </Group> */}
            </Group>

            {/* content */}
            <Box px={10} py={5}>
                <TextContent text={article.content} />
            </Box>

            {/* image */}
            {article.imageUrl && (
                <Box>
                    {/* <Image
                  alt=""
                  src={`https://be-node.vulebaolong.com/images/local-imageArticle-1740872693438-967081367.webp`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: `700px` }}
               /> */}
                    <ImageMantine src={checkPathImage(article.imageUrl)} alt="" />
                </Box>
            )}

            {/* sub-info */}
            <Group px={10} py={5}>
                <Text c={`dimmed`}>{article.commentCount} Bình Luận</Text>
            </Group>

            {/* control */}
            <Group px={10} py={10} justify="space-around">
                <ButtonLike article={article} />
                <Button onClick={handleClickComment} flex={1} leftSection={<IconMessageCircle size={20} />} variant="subtle">
                    Bình Luận
                </Button>
                <Button flex={1} leftSection={<IconShare3 size={20} />} variant="subtle">
                    Chia Sẻ
                </Button>
            </Group>
        </Box>
    );
}
