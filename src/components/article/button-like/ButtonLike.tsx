import { useCreateReactionArticle } from "@/api/tantask/reaction.tanstack";
import { resError } from "@/helpers/function.helper";
import { TArticle } from "@/types/article.type";
import { ActionIcon, Box, Button, Group, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconHeartFilled,
    IconMoodEmptyFilled,
    IconMoodHappyFilled,
    IconMoodSadFilled,
    IconMoodSmileFilled,
    IconMoodWrrrFilled,
    IconThumbUpFilled,
} from "@tabler/icons-react";
import { JSX, useState } from "react";
import { toast } from "react-toastify";
import IconReaction from "../icon-reaction/IconReaction";
import { TReactionType } from "@/types/reactioin.type";

type TProps = {
    article: TArticle;
};

export const iconsReaction: Record<TReactionType, (size: number) => JSX.Element> = {
    like: (size = 14) => <IconThumbUpFilled size={size} />,
    love: (size = 14) => <IconHeartFilled size={size} />,
    care: (size = 14) => <IconMoodSmileFilled size={size} />,
    haha: (size = 14) => <IconMoodHappyFilled size={size} />,
    wow: (size = 14) => <IconMoodEmptyFilled size={size} />,
    sad: (size = 14) => <IconMoodSadFilled size={size} />,
    angry: (size = 14) => <IconMoodWrrrFilled size={size} />,
};

export default function ButtonLike({ article }: TProps) {
    const [reactionType, setReactionType] = useState<TArticle["reaction"]>(article.reaction);
    const [opened, { close, open }] = useDisclosure(false);
    const createReactionArticle = useCreateReactionArticle();

    const handleLike = (article: TArticle, reactionType: TReactionType) => {
        setReactionType((prev) => {
            if (prev === reactionType) return null;
            return reactionType;
        });

        close();

        createReactionArticle.mutate(
            {
                targetId: article._id,
                targetType: "article",
                type: reactionType || "like",
            },
            {
                onSuccess: (data) => {
                    setReactionType(data?.type);
                },
                onError: (error) => {
                    console.log(error);
                    toast.error(resError(error, `Create Reaction Failed`));
                },
            }
        );
    };

    return (
        <Box onMouseEnter={open} onMouseLeave={close} style={{ display: "flex", position: "relative", flex: 1 }}>
            <Popover opened={opened} position="top" offset={0} >
                <Popover.Target>
                    <Button w={"100%"} onClick={() => handleLike(article, "like")} leftSection={<IconReaction reactionType={reactionType} />} variant="subtle">
                        Thích
                    </Button>
                </Popover.Target>

                <Popover.Dropdown sx={{ padding: `5px`, borderRadius: `9999999px` }}>
                    <Group gap={5}>
                        {Object.entries(iconsReaction).map(([key, IconComp]) => (
                            <ActionIcon
                                onClick={() => handleLike(article, key as TReactionType)}
                                key={key}
                                variant="light"
                                radius="xl"
                                aria-label={key}
                            >
                                {typeof IconComp === "function" ? IconComp(20) : IconComp}
                            </ActionIcon>
                        ))}
                    </Group>
                </Popover.Dropdown>
            </Popover>
        </Box>
    );
}
