"use client";

import { useCreatePermissions, useDeletePermissions, usePermissions, useUpdatePermissions } from "@/api/tantask/permission.tanstack";
import ContentAdmin, { TFieldCreate } from "@/components/content-admin/ContentAdmin";
import Paper from "@/components/custom/paper/PaperCustom";
import TooltipCustom from "@/components/custom/tooltip/TooltipCustom";
import { formatLocalTime } from "@/helpers/function.helper";
import { TPermission } from "@/types/permission.type";
import { ActionIcon, Badge, CopyButton, Group, Text } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

export default function Permission() {
    const columnHelper = createColumnHelper<TPermission>();
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
            columnHelper.accessor("endpoint", {
                header: "Endpoint",
                size: 150,
                cell: ({ cell }) => {
                    return (
                        <Text truncate="end" maw={150} size="sm">
                            {cell.getValue()}
                        </Text>
                    );
                },
            }),
            columnHelper.accessor("method", {
                header: "Module",
                size: 150,
                cell: ({ cell }) => {
                    const method = cell.getValue();
                    return (
                        <Badge
                            size="lg"
                            variant="light"
                            color={(() => {
                                if (method === `POST`) return `yellow`;
                                if (method === `PUT`) return `blue`;
                                if (method === `PATCH`) return `violet`;
                                if (method === `DELETE`) return `red`;
                                return `green`;
                            })()}
                        >
                            {method}
                        </Badge>
                    );
                },
            }),
            columnHelper.accessor("module", {
                header: "Module",
                size: 150,
                cell: ({ cell }) => {
                    return (
                        <Text truncate="end" maw={150} size="sm">
                            {cell.getValue()}
                        </Text>
                    );
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
            { label: "Endpoint", name: "endpoint", type: "text", withAsterisk: true },
            {
                label: "Method",
                name: "method",
                type: "select",
                dataSelect: [
                    { label: `GET`, value: `GET` },
                    { label: `POST`, value: `POST` },
                    { label: `PUT`, value: `PUT` },
                    { label: `PATCH`, value: `PATCH` },
                    { label: `DELETE`, value: `DELETE` },
                ],
                defaultValue: "true",
                withAsterisk: true,
            },
            { label: "module", name: "module", type: "text", withAsterisk: true },
        ],
        []
    );

    return (
        <Paper>
            <ContentAdmin<TPermission>
                title="Permission"
                columns={columns}
                creates={fields}
                updates={fields}
                sort={{ sortBy: "createdAt", isDesc: true }}
                fetchData={usePermissions}
                onCreate={useCreatePermissions}
                onUpdate={useUpdatePermissions}
                //  onDetail={(row) => {
                //      router.push(`${ROUTER_ADMIN.ROLE}/${row.id}`);
                //  }}
                onDelete={useDeletePermissions}
                filters={[
                    { field: "id", label: "Id", type: "text" },
                    { field: "name", label: "Tên", type: "text" },
                    { field: "endpoint", label: "Endpoint", type: "text" },
                    { field: "module", label: "Module", type: "text" },
                    { field: "method", label: "Method", type: "select", data: ["POST", "GET", "PUT", "PATCH", "DELETE"] },
                    { field: "createdAt", label: "Ngày", type: "date" },
                    { field: "isDeleted", label: "Xóa", type: "select", data: ["true", "false"] },
                ]}
            />
        </Paper>
    );
}
