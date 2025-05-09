"use client";

import ContentAdmin, { TFieldCreate } from "@/components/content-admin/ContentAdmin";
import Paper from "@/components/custom/paper/PaperCustom";
import TooltipCustom from "@/components/custom/tooltip/TooltipCustom";
import { ROUTER_ADMIN } from "@/constant/router.constant";
import { formatLocalTime } from "@/helpers/function.helper";
import { useRoles, useUpdateRoles } from "@/tantask/role.tanstack";
import { TRole } from "@/types/role.type";
import { ActionIcon, Badge, CopyButton, Group, Text } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function Role() {
   const router = useRouter();
   const columnHelper = createColumnHelper<TRole>();
   const columns = useMemo(
      () => [
         columnHelper.accessor("id", {
            header: "ID",
            size: 50,
            cell: ({ cell }) => {
               const id = cell.getValue();
               return (
                  <TooltipCustom label={`${id}`}>
                     <Group wrap="nowrap" justify="space-between">
                        <Text truncate="end" maw={50} size="sm" ta={`center`}>
                           {id}
                        </Text>

                        <CopyButton value={`${id}`} timeout={2000}>
                           {({ copied, copy }) => (
                              <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                                 {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                              </ActionIcon>
                           )}
                        </CopyButton>
                     </Group>
                  </TooltipCustom>
               );
            },
         }),
         columnHelper.accessor("name", {
            header: "Tên",
            size: 150,
            cell: ({ cell }) => {
               return (
                  <Text truncate="end" maw={150} size="sm">
                     {cell.getValue()}
                  </Text>
               );
            },
         }),
         columnHelper.accessor("description", {
            header: "Mô tả",
            size: 150,
            cell: ({ cell }) => {
               return (
                  <Text truncate="end" maw={150} size="sm">
                     {cell.getValue()}
                  </Text>
               );
            },
         }),
         columnHelper.accessor("isActive", {
            header: "Trạng thái",
            size: 150,
            cell: ({ cell }) => {
               return <>{cell.getValue() ? <Badge color="green">Mở</Badge> : <Badge color="red">Đóng</Badge>}</>;
            },
         }),
         columnHelper.accessor("createdAt", {
            header: "Ngày",
            size: 150,
            cell: ({ cell }) => {
               return (
                  <Text truncate="end" maw={150} size="sm">
                     {formatLocalTime(cell.getValue())}
                  </Text>
               );
            },
         }),
      ],
      []
   );

   const fields: TFieldCreate[] = useMemo<TFieldCreate[]>(
      () => [
         { label: "Tên", name: "name", type: "text", withAsterisk: true },
         { label: "Mô tả", name: "description", type: "text", withAsterisk: true },
         {
            label: "Trạng thái",
            name: "isActive",
            type: "select",
            dataSelect: [
               { label: `Mở`, value: `true` },
               { label: `Đóng`, value: `false` },
            ],
            defaultValue: "true",
            withAsterisk: true,
         },
      ],
      []
   );

   return (
      <Paper>
         <ContentAdmin<TRole>
            title="Role"
            columns={columns}
            creates={fields}
            updates={fields}
            sort={{ sortBy: "createdAt", isDesc: true }}
            fetchData={useRoles}
            // onCreate={useCreateUsers}
            onUpdate={useUpdateRoles}
            onDetail={(row) => {
               router.push(`${ROUTER_ADMIN.ROLE}/${row.id}`);
            }}
            // onDelete={useDeleteUsers}
            filters={[
               { field: "id", label: "Id", type: "text" },
               { field: "name", label: "Tên", type: "text" },
               { field: "description", label: "Mô tả", type: "text" },
               // { field: "created_by.username", label: "Tạo Bởi", type: "text" },
               { field: "createdAt", label: "Ngày", type: "date" },
            ]}
         />
      </Paper>
   );
}
