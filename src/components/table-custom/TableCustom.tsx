import {
   ActionIcon,
   Box,
   Center,
   CopyButton,
   Loader,
   MantineStyleProp,
   Pagination,
   Paper,
   rem,
   ScrollArea,
   Table,
   TableTd,
   TableTh,
   TableThead,
   TableTr,
   Tooltip,
} from "@mantine/core";
import Nodata from "../no-data/Nodata";
import classes from "./TableCustom.module.css";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { JSX, useEffect, useState } from "react";

type TParamsRender = {
   value: any;
   colIndex: number;
   row: any;
   rowIndex: number;
   data: any[];
   columns: TTableColumns[];
   ButtonCopy({ value, ...props }: TPropsButtonCopy): JSX.Element;
};

type TParamsLabel = {
   index: number;
   data: any[];
   columns: TTableColumns[];
};

type TTableColumns = {
   key?: string;
   label?: any | (({}: TParamsLabel) => any);
   isHiddenColumn?: boolean;
   width?: number;
   align?: "left" | "right" | "center";
   rowLink?: (row: any) => string;
   render?: ({}: TParamsRender) => any;
   styleTableTh?: MantineStyleProp;
};

type TProps = {
   isLoading?: boolean;
   pageCount?: number | null | undefined;
   data?: any[] | null | undefined;
   isError?: boolean;
   page?: number;
   setPage: React.Dispatch<React.SetStateAction<number>>;
   columns: TTableColumns[];
   onClickRow?: ({ row, rowIndex }: { row: any; rowIndex: number }) => void;
};

type TPropsButtonCopy = {
   value: string;
};
function ButtonCopy({ value, ...props }: TPropsButtonCopy) {
   return (
      <CopyButton {...props} value={value} timeout={2000}>
         {({ copied, copy }) => (
            <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
               <ActionIcon size={`xs`} color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                  {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy />}
               </ActionIcon>
            </Tooltip>
         )}
      </CopyButton>
   );
}

export default function TableCustom(props: TProps) {
   const { pageCount, isLoading = false, data, isError = false, page = 1, setPage, columns, onClickRow } = props;

   const [totalPage, setTotalPage] = useState(1);

   useEffect(() => {
      if (typeof pageCount === "number" && pageCount >= 0) {
         setTotalPage(pageCount);
      }
   }, [pageCount]);

   const renderStatus = () => {
      if (isLoading) {
         return (
            <Center className={`${classes[`box-status`]}`}>
               <Loader size={`md`} />
            </Center>
         );
      }

      if (!data || data.length === 0 || isError) {
         return (
            <Center className={`${classes[`box-status`]}`}>
               <Nodata />
            </Center>
         );
      }
   };

   const renderContent = () => {
      if (isLoading) return <></>;

      if (!data || data.length === 0 || isError) return <></>;

      return (
         <>
            {data.map((row, rowIndex) => (
               <TableTr
                  onClick={() => {
                     if (onClickRow) onClickRow({ row, rowIndex });
                  }}
                  key={rowIndex}
                  style={{
                     opacity: "0",
                     animation: "fadeInUp 0.5s forwards",
                     animationDelay: `${50 * rowIndex}ms`,
                     cursor: onClickRow ? `pointer` : `default`,
                  }}
               >
                  {columns.map((col, colIndex) => {
                     if (col.isHiddenColumn) return <></>;

                     return (
                        <TableTd key={colIndex} align={col.align || `center`}>
                           {col.render
                              ? col.render({
                                   value: col.key ? row[col.key] : undefined,
                                   colIndex,
                                   row,
                                   rowIndex,
                                   data,
                                   columns,
                                   ButtonCopy,
                                })
                              : col.key
                              ? row[col.key]
                              : ``}
                        </TableTd>
                     );
                  })}
               </TableTr>
            ))}
         </>
      );
   };

   return (
      <Paper shadow="md" radius="lg" withBorder p="xl">
         <Box className={`${classes[`table`]}`}>
            <Box className={`${classes[`box-content`]}`}>
               {renderStatus()}

               <ScrollArea
                  type="always"
                  offsetScrollbars
                  styles={{ thumb: { backgroundColor: `var(--mantine-color-blue-7)` }, root: { height: `100%` } }}
               >
                  <Table highlightOnHover={onClickRow ? true : false}>
                     <TableThead>
                        <TableTr>
                           {columns.map((col, index) => {
                              if (col.isHiddenColumn) return <></>;
                              return (
                                 <TableTh key={index} style={{ whiteSpace: "nowrap", textAlign: col.align || "center", ...col.styleTableTh }}>
                                    {typeof col.label === `function` ? col.label({ data, columns, index }) : col.label}
                                 </TableTh>
                              );
                           })}
                        </TableTr>
                     </TableThead>

                     <Table.Tbody>{renderContent()}</Table.Tbody>
                  </Table>
               </ScrollArea>
            </Box>

            <Center>
               <Pagination size={"xs"} total={totalPage} value={page} onChange={setPage} />
            </Center>
         </Box>
      </Paper>
   );
}
