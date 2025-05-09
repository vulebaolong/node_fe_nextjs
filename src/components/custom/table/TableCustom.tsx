import {
   ActionIcon,
   Box,
   Group,
   Indicator,
   LoadingOverlay,
   MantineStyleProp,
   NumberInput,
   Pagination,
   Paper,
   ScrollArea,
   Select,
   Stack,
   Table,
   TableTbody,
   TableTd,
   TableTh,
   TableThead,
   TableTr,
   TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconCalendar, IconEdit, IconEyeUp, IconTrash } from "@tabler/icons-react";
import { UseQueryResult } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import NodataOverlay from "../../no-data/NodataOverlay";
import { TResPagination } from "@/types/app.type";

export type TPaginationTable = {
   pageIndex: number;
   pageSize: number;
};

export type TPayloadTable = {
   pagination: TPaginationTable;
   filters?: Record<string, any>;
   sort?: {
      sortBy?: string;
      isDesc?: boolean;
   };
   refetchInterval?: number | false;
};

export type TFilterOption =
   | {
        label: string;
        field: string;
        type: "text" | "number" | "date";
     }
   | {
        label: string;
        field: string;
        type: "select";
        data: string[];
     };

type TProps<T> = {
   fetchData: (payload: TPayloadTable) => UseQueryResult<TResPagination<T>, Error>;
   columns: any;
   filters?: TFilterOption[];
   sort?: TPayloadTable["sort"];
   heightScroll?: string | number;
   showPaginations?: boolean;
   showPageSize?: boolean;
   refetchInterval?: number | false;
   styleTable?: MantineStyleProp;
   styleTableThead?: MantineStyleProp;
   styleTableTbody?: MantineStyleProp;
   styleTableTh?: MantineStyleProp;
   styleTableTr?: MantineStyleProp;
   styleTableTd?: MantineStyleProp;
   onDetail?: (row: T) => void;
   onEdit?: (row: T) => void;
   onDelete?: (row: T) => void;
};

function TableCustom<T>(props: TProps<T>) {
   const {
      columns,
      fetchData,
      filters = [],
      sort = {},
      heightScroll = `500px`,
      showPaginations = true,
      showPageSize = true,
      refetchInterval = false,
      styleTable = {},
      styleTableThead = {},
      styleTableTbody = {},
      styleTableTh = {},
      styleTableTr = {},
      styleTableTd = {},
      onDetail,
      onEdit,
      onDelete,
   } = props;

   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
   const [filtersValue, setFiltersValue] = useState({});
   const handleSearch = useDebouncedCallback(async (query: any) => {
      setFiltersValue(query);
   }, 500);

   const queryData = fetchData({
      pagination: { pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize },
      filters: filtersValue,
      refetchInterval,
      sort,
   });

   const [totalPage, setTotalPage] = useState(1);
   useEffect(() => {
      if (typeof queryData.data?.totalPage === "number" && queryData.data?.totalPage >= 0) {
         setTotalPage(queryData.data?.totalPage);
      }
   }, [queryData.data?.totalPage]);

   const table = useReactTable({
      columns,
      data: queryData.data?.items || [],
      pageCount: queryData.data?.totalPage,
      manualPagination: true,
      onPaginationChange: setPagination,
      state: { pagination },
      getCoreRowModel: getCoreRowModel(),
   });

   const renderContent = () => {
      if (queryData.isLoading) return <></>;

      if (!queryData.data || queryData.data.items.length === 0 || queryData.isError) return <></>;

      return (
         <>
            {table.getRowModel().rows.map((row, rowIndex) => {
               console.log({ row: row.original });
               return (
                  <TableTr
                     key={rowIndex}
                     style={{
                        opacity: "0",
                        animation: "fadeInUp 0.5s forwards",
                        animationDelay: `${50 * rowIndex}ms`,
                        ...styleTableTr,
                     }}
                  >
                     {row.getVisibleCells().map((cell, colIndex) => {
                        return (
                           <TableTd style={{ ...styleTableTd }} key={colIndex}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                           </TableTd>
                        );
                     })}
                     {(onEdit || onDelete) && (
                        <TableTd style={{ ...styleTableTd }}>
                           <Group wrap="nowrap">
                              {onDetail && (
                                 <ActionIcon onClick={() => onDetail?.(row.original)} variant="outline">
                                    <IconEyeUp size={16} />
                                 </ActionIcon>
                              )}
                              {onEdit && (
                                 <ActionIcon onClick={() => onEdit?.(row.original)} color="blue">
                                    <IconEdit size={16} />
                                 </ActionIcon>
                              )}
                              {onDelete && (
                                 <ActionIcon onClick={() => onDelete?.(row.original)} color="red">
                                    <IconTrash size={16} />
                                 </ActionIcon>
                              )}
                           </Group>
                        </TableTd>
                     )}
                  </TableTr>
               );
            })}
         </>
      );
   };

   return (
      <Stack>
         {filters.length > 0 && (
            <Paper pos="relative" shadow="md" radius="lg" withBorder p="md">
               <Group>
                  {filters.map((item, i) => {
                     const { field, label, type } = item;
                     if (type === `date`) {
                        return (
                           <DatePickerInput
                              clearable
                              key={i}
                              onChange={(value) => {
                                 handleSearch({ ...filtersValue, [field]: value });
                              }}
                              label={label}
                              placeholder={label}
                              miw={172}
                              valueFormat="DD-MM-YYYY"
                              leftSection={<IconCalendar size={18} stroke={1.5} />}
                              renderDay={(date) => {
                                 const day = new Date(date).getDate();
                                 return (
                                    <Indicator size={6} color="red" offset={-5} disabled={day !== new Date().getDate()}>
                                       <div>{day}</div>
                                    </Indicator>
                                 );
                              }}
                           />
                        );
                     }
                     if (type === `select`) {
                        return (
                           <Select
                              key={i}
                              data={item.data}
                              label={label}
                              placeholder={label}
                              onChange={(value) => {
                                 handleSearch({ ...filtersValue, [field]: value });
                              }}
                              clearable
                           />
                        );
                     }
                     if (type === `number`) {
                        return (
                           <NumberInput
                              key={i}
                              onChange={(value) => {
                                 handleSearch({ ...filtersValue, [field]: value });
                              }}
                              label={label}
                              placeholder={label}
                           />
                        );
                     }
                     if (type === `text`) {
                        return (
                           <TextInput
                              key={i}
                              onChange={(event) => {
                                 const value = event.currentTarget.value.trim();
                                 // if (value === "") return;
                                 handleSearch({ ...filtersValue, [field]: value });
                              }}
                              label={label}
                              placeholder={label}
                           />
                        );
                     }
                  })}
               </Group>
            </Paper>
         )}
         <Stack>
            <Paper pos="relative" shadow="md" radius="lg" withBorder p="md">
               <LoadingOverlay visible={queryData.isLoading} zIndex={1000} overlayProps={{ radius: "sm", bg: `transparent` }} />
               <NodataOverlay visiable={!queryData.isLoading && (!queryData.data || queryData.data.items.length === 0 || queryData.isError)} />

               <ScrollArea
                  type="always"
                  offsetScrollbars
                  styles={{ thumb: { backgroundColor: `var(--mantine-color-blue-7)` }, root: { height: heightScroll } }}
               >
                  <Table stickyHeader style={{ ...styleTable }} withColumnBorders striped>
                     <TableThead style={{ ...styleTableThead }}>
                        {table.getHeaderGroups().map((headerGroup) => (
                           <TableTr key={headerGroup.id} style={{ ...styleTableTr }}>
                              {headerGroup.headers.map((header) => {
                                 return (
                                    <TableTh w={`fit-content`} key={header.id} style={{ ...styleTableTh }}>
                                       <Box w={header.getSize()}>
                                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                       </Box>
                                    </TableTh>
                                 );
                              })}
                              {(onEdit || onDelete) && (
                                 <TableTh key={`action`} style={{ ...styleTableTh }}>
                                    <Box w={100}>Hành động</Box>
                                 </TableTh>
                              )}
                           </TableTr>
                        ))}
                     </TableThead>

                     <TableTbody style={{ ...styleTableTbody }}>{renderContent()}</TableTbody>
                  </Table>
               </ScrollArea>
            </Paper>

            {(showPaginations || showPageSize) && (
               <Group justify="center" align="center">
                  {showPaginations && (
                     <Pagination
                        size={"sm"}
                        total={totalPage}
                        value={pagination.pageIndex + 1}
                        onChange={(e) => {
                           table.setPageIndex(Number(e) - 1);
                        }}
                     />
                  )}
                  {showPageSize && (
                     <Select
                        size={`sm`}
                        styles={{ input: { height: `26px`, minHeight: `22px` } }}
                        w={70}
                        value={pagination.pageSize.toString()}
                        onChange={(e) => {
                           table.setPageSize(Number(e));
                        }}
                        allowDeselect={false}
                        data={["10", "20", "30", "40", "50"]}
                     />
                  )}
               </Group>
            )}
         </Stack>
      </Stack>
   );
}

export default TableCustom;
