import { useElasticSearch } from "@/api/tantask/elastic-search.tanstack";
import NodataOverlay from "@/components/no-data/NodataOverlay";
import { multiRAF } from "@/helpers/function.helper";
import { Box, Divider, Input, LoadingOverlay, Modal } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import ArticleSearchItem from "./ArticleSearchItem";
import UserSearchItem from "./UserSearchItem";

type TProps = {
    opened: boolean;
    close: () => void;
};

type TElasticItem = {
    _index: string;
    _id: string;
    _score: number;
    _source: any;
    sort: number[];
};

export default function ModalElasticSearch({ opened, close }: TProps) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [allItems, setAllItems] = useState<TElasticItem[]>([]);
    const [currentSearch, setCurrentSearch] = useState("");

    const totalPageRef = useRef(0);
    const totalItemRef = useRef(0);
    const hasInitialLoadRef = useRef(false);
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const elasticSearch = useElasticSearch();

    // Cập nhật total khi có data mới
    useEffect(() => {
        if (elasticSearch.data?.totalPage) totalPageRef.current = elasticSearch.data.totalPage;
        if (elasticSearch.data?.totalItem) totalItemRef.current = elasticSearch.data.totalItem;
    }, [elasticSearch.data?.totalPage, elasticSearch.data?.totalItem]);

    // Append data vào allItems
    useEffect(() => {
        if (!elasticSearch.data?.items) return;

        setAllItems((prev) => {
            // Nếu là search mới (page = 1) thì reset
            if (page === 1) return elasticSearch.data.items;
            // Nếu load more thì append
            return [...prev, ...elasticSearch.data.items];
        });

        // Scroll to top khi search mới
        if (page === 1 && elasticSearch.data.items.length > 0) {
            hasInitialLoadRef.current = true;
            multiRAF(() => {
                virtuosoRef.current?.scrollToIndex({
                    index: 0,
                    align: "start",
                });
            });
        }
    }, [elasticSearch.data?.items, page]);

    const handleSearch = useDebouncedCallback(async (query: string) => {
        if (query.trim() === "") {
            setAllItems([]);
            setCurrentSearch("");
            return;
        }

        // Reset về trang 1 khi search mới
        setPage(1);
        setCurrentSearch(query);
        hasInitialLoadRef.current = false;

        elasticSearch.mutate(
            { search: query, page: 1, pageSize: 10 },
            {
                onSuccess: () => {
                    // console.log(data);
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    }, 500);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
        handleSearch(event.currentTarget.value);
    };

    // Load more khi scroll đến cuối
    const handleEndReached = () => {
        if (elasticSearch.isPending || page >= totalPageRef.current || !currentSearch) return;

        const nextPage = page + 1;
        setPage(nextPage);

        elasticSearch.mutate({
            search: currentSearch,
            page: nextPage,
            pageSize: 10,
        });
    };

    // Reset khi đóng modal
    useEffect(() => {
        if (!opened) {
            setSearch("");
            setAllItems([]);
            setPage(1);
            setCurrentSearch("");
            hasInitialLoadRef.current = false;
        }
    }, [opened]);

    return (
        <Modal
            opened={opened}
            onClose={close}
            size={`md`}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            styles={{
                body: {
                    padding: 0,
                },
            }}
            withCloseButton={false}
        >
            <Input
                value={search}
                onChange={handleChange}
                leftSection={<IconSearch size={16} />}
                variant="unstyled"
                placeholder="Tìm kiếm người dùng hoặc bài viết"
            />
            <Divider />
            <Box
                sx={{
                    minHeight: `120px`,
                    maxHeight: `400px`,
                    position: `relative`,
                    padding: `5px`,
                }}
            >
                <LoadingOverlay visible={elasticSearch.isPending && page === 1} />
                <NodataOverlay visible={!elasticSearch.isPending && allItems.length === 0 && search.trim() !== ""} />

                {allItems.length > 0 && (
                    <Virtuoso
                        ref={virtuosoRef}
                        data={allItems}
                        style={{ height: "400px" }}
                        itemContent={(index, item: TElasticItem) => {
                            return (
                                <Fragment key={`${item._index}-${item._id}`}>
                                    {item._index === "users" && <UserSearchItem user={item._source} onClick={close} />}
                                    {item._index === "articles" && <ArticleSearchItem article={item._source} onClick={close} />}
                                </Fragment>
                            );
                        }}
                        endReached={handleEndReached}
                    />
                )}
            </Box>
        </Modal>
    );
}
