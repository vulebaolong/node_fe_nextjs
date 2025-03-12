"use client";

import TableCustom from "@/components/table-custom/TableCustom";
import { ENDPOINT } from "@/constant/endpoint.constant";
import { formatLocalTime } from "@/helpers/function.helper";
import { useListRole } from "@/tantask/role.tanstack";
import { ActionIcon, Container, Loader, rem, Stack, Text, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconArrowRight, IconCircleCheckFilled, IconCircleX, IconEditCircle, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./Role.module.css";

export default function Role() {
   const [page, setPage] = useState(1);

   const router = useRouter();

   const [search, setSearch] = useState(``);
   const handleSearch = useDebouncedCallback(async (query: string) => {
      setSearch(query);
   }, 500);

   const listRole = useListRole({
      page: page,
      pageSize: 10,
      // pageSize: pagination.pageSize,
      search,
   });

   return (
      <Container py={100}>
         <Stack>
            <TextInput
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value;
                  handleSearch(value);
               }}
               radius="xl"
               size="md"
               my={20}
               placeholder="Search role"
               rightSectionWidth={42}
               leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
               rightSection={
                  listRole.isLoading ? (
                     <Loader size={20} />
                  ) : (
                     <ActionIcon size={32} radius="xl" color={`dark`} variant="filled">
                        <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                     </ActionIcon>
                  )
               }
            />

            <TableCustom
               setPage={setPage}
               page={page}
               pageCount={listRole.data?.totalPage}
               isLoading={listRole.isLoading}
               data={listRole.data?.items}
               isError={listRole.isError}
               // onClickRow={({ row }: { row: TListRoleRes }) => {
               //    router.push(`${ENDPOINT.ROLE}/${row.id}`);
               // }}
               columns={[
                  {
                     key: `id`,
                     label: `id`,
                     render: ({ value }) => {
                        return (
                           <Text size="sm" className={`${classes.text}`}>
                              {value}
                           </Text>
                        );
                     },
                  },
                  {
                     key: `name`,
                     label: `Name`,
                     align: `left`,
                     render: ({ value }) => {
                        return (
                           <Text size="sm" className={`${classes.text}`}>
                              {value}
                           </Text>
                        );
                     },
                  },
                  {
                     key: `description`,
                     label: `Description`,
                     align: `left`,
                     render: ({ value }) => {
                        return (
                           <Text size="sm" className={`${classes.text}`}>
                              {value}
                           </Text>
                        );
                     },
                  },
                  {
                     key: `isActive`,
                     label: `Active`,
                     render: ({ value }) => {
                        return (
                           <Text size="sm" className={`${classes.text}`}>
                              {value ? <IconCircleCheckFilled color="green" /> : <IconCircleX color="red" />}
                           </Text>
                        );
                     },
                  },
                  {
                     key: `isDeleted`,
                     label: `Deleted`,
                     render: ({ value }) => {
                        return (
                           <Text size="sm" className={`${classes.text}`}>
                              {value ? <IconCircleCheckFilled color="green" /> : <IconCircleX color="red" />}
                           </Text>
                        );
                     },
                  },
                  {
                     key: `createdAt`,
                     label: `CreatedAt`,
                     render: ({ value }) => {
                        return (
                           <Text size="sm" className={`${classes.text}`}>
                              {formatLocalTime(value)}
                           </Text>
                        );
                     },
                  },
                  {
                     label: `Action`,
                     render: ({ row }) => {
                        return (
                           <ActionIcon
                              onClick={() => {
                                 router.push(`${ENDPOINT.ROLE}/${row.id}`);
                              }}
                              variant="filled"
                              aria-label="Settings"
                           >
                              <IconEditCircle style={{ width: "70%", height: "70%" }} stroke={1.5} />
                           </ActionIcon>
                        );
                     },
                  },
               ]}
            />
         </Stack>
      </Container>
   );
}
