import Article from "@/components/article/Article";
import CommentInput from "@/components/comment/comment-input/CommentInput";
import CommentList from "@/components/comment/CommentList";
import { useAppSelector } from "@/redux/hooks";
import { TListComment } from "@/types/comment.type";
import { Box, Modal } from "@mantine/core";
import { useState } from "react";

type TProps = {
    opened: boolean;
    close: () => void;
};

export default function ModalArticleDetail({ opened, close }: TProps) {
    const articleDetail = useAppSelector((state) => state.article.articleDetail);
    const [listComment, setListComment] = useState<TListComment[]>([]);

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={`Bài viết của ${articleDetail?.Users?.fullName.split(` `)[0]}`}
            styles={{
                title: {
                    fontSize: "24px",
                    fontWeight: "bold",
                    width: `100%`,
                    textAlign: `center`,
                },
                body: {
                    padding: `0px`,
                    display: `flex`,
                    flexDirection: `column`,
                    height: `var(--modal-content-max-height, calc(100dvh - var(--modal-y-offset) * 4) )`,
                },
                content: {
                    overflowY: `unset`,
                },
            }}
            size={`xl`}
            centered
        >
            <Box
                sx={{
                    overflowY: `auto`,
                    flexGrow: 1,
                }}
            >
                {articleDetail && <Article article={articleDetail} />}
                {articleDetail && <CommentList article={articleDetail} listComment={listComment} setListComment={setListComment} />}
            </Box>
            {articleDetail && <CommentInput article={articleDetail} setListComment={setListComment} />}
        </Modal>
    );
}
