"use client";

import Nodata from "@/components/no-data/Nodata";
import { useGetDemo } from "@/api/tantask/get-demo.tanstack";
import { Box, Center, Container, Group, Loader, Pagination, Paper, Stack, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Filter from "./Filter";

const filters = [
   { field: "id", label: "Id", type: "number" },
   { field: "content", label: "Nội dung", type: "text" },
   { field: "views", label: "Views", type: "number" },
   // { field: "createdAt", label: "Ngày", type: "date" },
];

export default function GetDemo() {
   const totalPageRef = useRef(0);
   const [totalPage, setTotalPage] = useState(0);
   const [page, setPage] = useState(1);
   const [pageSize] = useState(3);
   const [filtersValue, setFiltersValue] = useState({});

   const getDemo = useGetDemo(`article`, page, pageSize, filtersValue);

   useEffect(() => {
      if (getDemo.data?.data?.totalPage) {
         totalPageRef.current = getDemo.data?.data?.totalPage;
         setTotalPage(getDemo.data?.data?.totalPage);
      }
   }, [getDemo.data]);

   const renderContent = () => {
      if (getDemo.isLoading)
         return (
            <Center>
               <Loader />
            </Center>
         );

      if (!getDemo.data || (getDemo.data?.data?.items || getDemo.data?.data || []).length === 0 || getDemo.isError)
         return (
            <Center>
               <Nodata />
            </Center>
         );

      return (
         <>
            {(getDemo.data?.data?.items || getDemo.data?.data || []).map((item: any, i: number) => {
               return (
                  <Group
                     key={i}
                     style={{
                        opacity: "0",
                        animation: "fadeInUp 0.5s forwards",
                        animationDelay: `${50 * i}ms`,
                     }}
                  >
                     <Text>{item.id}</Text>
                     <Text>{item.content}</Text>
                     <Text>{item.views}</Text>
                     {/* <Text>{formatLocalTime(item.createdAt)}</Text> */}
                  </Group>
               );
            })}
         </>
      );
   };

   return (
      <Container>
         <Box my={100}>
            <Paper shadow="md" radius="lg" withBorder p="xl">
               <Stack>
                  <Text fz={24}>List Article</Text>
                  <Group>
                     <Filter
                        filtersValue={filtersValue}
                        filters={filters}
                        setFiltersValue={(data) => {
                           setFiltersValue(data);
                           setPage(1);
                        }}
                     />
                  </Group>
                  <Stack mih={300}>{renderContent()}</Stack>
                  <Pagination total={totalPage} size="sm" onChange={setPage} value={page} />
               </Stack>
            </Paper>
         </Box>
      </Container>
   );
}
