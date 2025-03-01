"use client";

import Article from "@/components/article/Article";
import Avatar from "@/components/avatar/Avatar";
import ModalCreateArticle from "@/components/modal/modal-create-article/ModalCreateArticle";
import { useAppSelector } from "@/redux/hooks";
import { useGetListArticle } from "@/tantask/article.tanstack";
import { TArticle } from "@/types/article.type";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HomeCenter.module.css";


export default function HomeCenter() {
   const info = useAppSelector((state) => state.user.info);
   const [opened, { open, close }] = useDisclosure(false);
   const getListArticle = useGetListArticle()


   return (
      <>
         <Stack maw={680} mx={`auto`}>
            <Box className={`${classes[`box-1`]}`} px={10} py={15}>
               <Group wrap="nowrap">
                  <Avatar user={info} />
                  <Button styles={{ inner: { justifyContent: `start` } }} onClick={open} size="md" flex={1} variant="light" color="gray" radius="xl">
                     <Text fz={`md`} fw={`bold`} w={`100%`}>
                        {info?.fullName} ơi, Bạn Đang Nghĩ Gì Thế
                     </Text>
                  </Button>
               </Group>
            </Box>
            <Stack>
               {getListArticle.data?.items.map((article: TArticle, i) => {
                  return <Article key={i} article={article} />;
               })}
            </Stack>
         </Stack>
         <ModalCreateArticle opened={opened} close={close} />
      </>
   );
}
