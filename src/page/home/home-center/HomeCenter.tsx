"use client";

import { useGetListArticle } from "@/api/tantask/article.tanstack";
import Article from "@/components/article/Article";
import ArticleList from "@/components/article/ArticleList";
import Avatar from "@/components/avatar/Avatar";
import { DataStateWrapper } from "@/components/data-state-wrapper/DataStateWrapper";
import ModalArticleDetail from "@/components/modal/modal-article-detail/ModalArticleDetail";
import ModalCreateArticle from "@/components/modal/modal-create-article/ModalCreateArticle";
import { background1 } from "@/components/provider/mantine/sx/background.sx";
import { useAppSelector } from "@/redux/hooks";
import { TArticle } from "@/types/article.type";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function HomeCenter() {
    const info = useAppSelector((state) => state.user.info);
    const [openedModalCreateAticle, handleModalCreateArticle] = useDisclosure(false);
    const [openedModalAticleDetail, handleModalArticleDetail] = useDisclosure(false);

    return (
        <>
            <Stack maw={680} mx={`auto`}>
                <Box
                    sx={(_, u) => {
                        return {
                            padding: `20px`,
                            ...background1(_, u),
                        };
                    }}
                >
                    <Group wrap="nowrap">
                        <Avatar fullName={info?.fullName} avatar={info?.avatar} />
                        <Button
                            styles={{ inner: { justifyContent: `start` } }}
                            onClick={handleModalCreateArticle.open}
                            size="md"
                            flex={1}
                            variant="light"
                            color="gray"
                            radius="xl"
                        >
                            <Text fz={`md`} fw={`bold`} w={`100%`}>
                                {info?.fullName} ơi, Bạn Đang Nghĩ Gì Thế
                            </Text>
                        </Button>
                    </Group>
                </Box>
                <Stack>
                    <ArticleList />
                    {/* <DataStateWrapper
                        isLoading={getListArticle.isLoading || getListArticle.isFetching}
                        isError={getListArticle.isError}
                        isEmpty={!getListArticle.data || getListArticle.data.items?.length === 0}
                    >
                        {(getListArticle.data?.items || []).map((article: TArticle, i) => {
                            return <Article key={i} article={article} handleModalArticleDetail={handleModalArticleDetail} />;
                        })}
                    </DataStateWrapper> */}
                </Stack>
            </Stack>
            <ModalCreateArticle opened={openedModalCreateAticle} close={handleModalCreateArticle.close} />
            <ModalArticleDetail opened={openedModalAticleDetail} close={handleModalArticleDetail.close} />
        </>
    );
}
