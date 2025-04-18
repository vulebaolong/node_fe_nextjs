"use client";

import Nodata from "@/components/no-data/Nodata";
import { formatLocalTime } from "@/helpers/function.helper";
import { useGetDemo } from "@/tantask/get-demo.tanstack";
import { Avatar, Box, Center, Container, Group, Loader, Paper, Stack, Text } from "@mantine/core";

export default function GetDemo() {

   const getDemo = useGetDemo(`demo/mysql2`);
   console.log({ getDemo: getDemo.data });

   const renderContent = () => {
      if (getDemo.isLoading)
         return (
            <Center>
               <Loader />
            </Center>
         );

      if (!getDemo.data || getDemo.data.data.length === 0 || getDemo.isError)
         return (
            <Center>
               <Nodata />
            </Center>
         );

      return (
         <>
            {getDemo.data?.data?.map((item: any, i: number) => {
               return (
                  <Group key={i}>
                     <Text>{i + 1}</Text>
                     <Avatar color={`initials`} name={!item?.avatar ? (item?.fullName as string | undefined) : `??`} />
                     <Text>{item.email}</Text>
                     <Text>{item.fullName}</Text>
                     <Text>{formatLocalTime(item.createdAt)}</Text>
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
               <Text fz={24}>List Users</Text>
               <Stack>{renderContent()}</Stack>
            </Paper>
         </Box>
      </Container>
   );
}
