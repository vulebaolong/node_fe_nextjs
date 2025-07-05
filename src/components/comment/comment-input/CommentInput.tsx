import { useCreateComment } from "@/api/tantask/comment.tanstack";
import Avatar from "@/components/avatar/Avatar";
import { resError } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { TArticle } from "@/types/article.type";
import { TCreateCommentReq, TListComment } from "@/types/comment.type";
import { ActionIcon, Box, Group, Textarea } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type TProps = {
    article: TArticle;
    setListComment: Dispatch<SetStateAction<TListComment[]>>;
};

export default function CommentInput({ article, setListComment }: TProps) {
    const [value, setValue] = useState("");
    const info = useAppSelector((state) => state.user.info);

    const createComment = useCreateComment();

    const handleCreateComment = () => {
        if (value.trim() === "" || !info) return;

        const payload: TCreateCommentReq = {
            articleId: article._id,
            content: value,
            parentId: null,
        };

        setListComment((prev) => {
            console.log({ prev });
            const data = {
                articleId: article._id,
                userId: info._id,
                content: value,
                parentId: null,
                level: 0,
                replyCount: 0,
                Users: info,
            };
            if (prev.length === 0) return [data];
            return [data, ...prev];
        });

        createComment.mutate(payload, {
            onSuccess: (data) => {
                setValue(``);
                setListComment((prev) => {
                    prev[0] = data;
                    return [...prev];
                });
            },
            onError: (error) => {
                console.log({ error });
                toast.error(resError(error, `Create comment failed`));
            },
        });
    };

    return (
        <Group sx={{ padding: `10px` }}>
            <Box sx={{ height: `100%` }}>
                <Avatar fullName={info?.fullName} avatar={info?.avatar} />
            </Box>
            <Textarea
                sx={{ flex: 1 }}
                autosize
                placeholder="Viết bình luận"
                radius="lg"
                minRows={1}
                maxRows={10}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
            <Box sx={{ height: `100%` }}>
                <ActionIcon
                    disabled={createComment.isPending || value.trim() === ""}
                    onClick={handleCreateComment}
                    variant="subtle"
                    size={`lg`}
                    style={{ borderRadius: `100%` }}
                >
                    <IconSend2 />
                </ActionIcon>
            </Box>
        </Group>
    );
}
