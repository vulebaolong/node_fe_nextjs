"use client";

import ArticleList from "@/components/article/ArticleList";
import Avatar from "@/components/avatar/Avatar";
import ModalCreateArticle from "@/components/modal/modal-create-article/ModalCreateArticle";
import { background1 } from "@/components/provider/mantine/sx/background.sx";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function HomeCenter() {
    const info = useAppSelector((state) => state.user.info);
    const [openedModalCreateAticle, handleModalCreateArticle] = useDisclosure(false);

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
                {/* <ArticleList height="calc(100vh - (82px + 20px + var(--height-header))" type="all" /> */}
                <ArticleList height="calc(100vh - (82px + 20px + 20px + var(--height-header))" type="all" />
                {/* <DataStateWrapper
                        isLoading={getAllArticle.isLoading || getAllArticle.isFetching}
                        isError={getAllArticle.isError}
                        isEmpty={!getAllArticle.data || getAllArticle.data.items?.length === 0}
                    >
                        {(getAllArticle.data?.items || []).map((article: TArticle, i) => {
                            return <Article key={i} article={article} handleModalArticleDetail={handleModalArticleDetail} />;
                        })}
                    </DataStateWrapper> */}
            </Stack>
            <ModalCreateArticle opened={openedModalCreateAticle} close={handleModalCreateArticle.close} />
        </>
    );
}
