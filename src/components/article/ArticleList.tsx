import { useGetListArticle } from "@/api/tantask/article.tanstack";
import { TArticle } from "@/types/article.type";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import ModalArticleDetail from "../modal/modal-article-detail/ModalArticleDetail";
import Article from "./Article";

export default function ArticleList() {
    const [openedModalAticleDetail, handleModalArticleDetail] = useDisclosure(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [page, setPage] = useState(1);
    const totalPageRef = useRef(0);

     const getListArticle = useGetListArticle({
            pagination: { pageIndex: page, pageSize: 10 },
            sort: { sortBy: `createdAt`, isDesc: true },
        });

    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const [articles, setArticles] = useState<TArticle[]>([]);

    const totalItemRef = useRef(0);

    const firstItemIndex = Math.max(0, totalItemRef.current - articles.length);

    // Kéo lên để load thêm
    const handleStartReached = () => {
        if (getListArticle.isFetching || page >= totalPageRef.current) return;
        setPage((prev) => prev + 1);
    };

    return (
        <>
            <div>
                <Virtuoso
                    ref={virtuosoRef}
                    data={articles}
                    firstItemIndex={firstItemIndex}
                    style={{ height: "100%" }}
                    itemContent={(i, article: TArticle) => {
                        return <Article key={i} article={article} handleModalArticleDetail={handleModalArticleDetail} />;
                    }}
                    atBottomStateChange={setIsAtBottom}
                    startReached={handleStartReached}
                />
            </div>
            <ModalArticleDetail opened={openedModalAticleDetail} close={handleModalArticleDetail.close} />
        </>
    );
}
