import { useGetAllArticle } from "@/api/tantask/article.tanstack";
import { TArticle } from "@/types/article.type";
import { Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { DataStateWrapper } from "../data-state-wrapper/DataStateWrapper";
import ModalArticleDetail from "../modal/modal-article-detail/ModalArticleDetail";
import ArticleSkeleton from "../skeletons/ArticleSkeleton";
import Article from "./Article";

type TProps = {
    height: string;
    filters?: Record<string, any>;
    type: "all" | "my" | "other";
};

export default function ArticleList({ height, filters, type }: TProps) {
    const totalPageRef = useRef(0);
    const [openedModalAticleDetail, handleModalArticleDetail] = useDisclosure(false);
    const [page, setPage] = useState(1); // CHỈNH: Thay vì const [page]
    const [articles, setArticles] = useState<TArticle[]>([]);

    const virtuosoRef = useRef<VirtuosoHandle>(null);
    const pageSize = 10; // số bài mỗi lần load

    const getAllArticle = useGetAllArticle({
        pagination: { page: page, pageSize },
        filters: { ...filters },
        sort: { sortBy: `createdAt`, isDesc: true },
    });

    // Khi fetch thành công, append articles vào cuối mảng
    useEffect(() => {
        if (!getAllArticle.data?.items) return;
        setArticles((prev) => {
            const articles = getAllArticle.data.items;
            if (prev.length === 0) return articles;
            return [...articles, ...prev];
        });
    }, [getAllArticle.data?.items, page]);

    const handleEndReached = () => {
        if (getAllArticle.isFetching || page >= totalPageRef.current) return;
        setPage((prev) => prev + 1);
    };

    return (
        <>
            <Stack style={{ position: "relative", height: height }}>
                {type !== "all" && (
                    <Text fw={`bold`} fz={`lg`}>
                        Bài viết
                    </Text>
                )}
                <Stack style={{ position: "relative", height: height }}>
                    <DataStateWrapper
                        isLoading={getAllArticle.isLoading || getAllArticle.isFetching}
                        isError={getAllArticle.isError}
                        isEmpty={!getAllArticle.data || getAllArticle.data.items?.length === 0}
                        loadingComponent={<ArticleSkeleton />}
                    >
                        <Virtuoso
                            ref={virtuosoRef}
                            data={articles}
                            style={{ height: "100%" }}
                            itemContent={(i, article: TArticle) => (
                                <Article key={i} article={article} handleModalArticleDetail={handleModalArticleDetail} />
                            )}
                            endReached={handleEndReached}
                        />
                    </DataStateWrapper>
                </Stack>
            </Stack>

            <ModalArticleDetail opened={openedModalAticleDetail} close={handleModalArticleDetail.close} />
        </>
    );
}
