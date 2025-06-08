import { TResPagination } from "@/types/app.type";
import { Button, Center, ComboboxData, ComboboxStringData, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React, { ReactNode, useRef, useState } from "react";
import TableCustom, { TFilterOption, TPayloadTable } from "../custom/table/TableCustom";
import DrawerMutation from "./DrawerMutation";

export type FieldType = "text" | "password" | "number" | "select" | "select-boolean" | "date" | "custom" | "tags" | "textArea" | "editor" | "radio";

export type TFieldCreate = {
   initValue?: any;
   label: string;
   name: string;
   type: FieldType;

   props?: any;

   placeholder?: string;
   withAsterisk?: boolean;
   defaultValue?: string | number;

   // Với input type number
   suffix?: string;
   leftSection?: ReactNode;
   thousandSeparator?: string | boolean;

   // Với textarea
   autosize?: boolean;
   minRows?: number;
   maxRows?: number;
   resize?: React.CSSProperties["resize"];

   // Với select
   dataSelect?: ComboboxData;

   // Với tags
   dataTags?: ComboboxStringData; // mảng string (label enum)

   // Với radio
   dataRadios?: string[]; // mảng string (label enum)

   enum?: Record<any, any>; // dùng để map label -> id

   // custom
   component?: (props: { value: any; error: string | undefined; setValue: (value: any) => void; createForm: FormikProps<any> }) => React.ReactElement;

   validate?: (Yup: typeof import("yup"), base: any) => any;
};

type TProps<T> = {
   columns: any;
   creates: TFieldCreate[];
   updates: TFieldCreate[];
   heightScrollTable?: string | number;
   title?: string;
   filters?: TFilterOption[];
   sort?: TPayloadTable["sort"];
   onCreate?: () => UseMutationResult<any, Error, any, unknown>;
   onUpdate?: () => UseMutationResult<any, Error, any, unknown>;
   onDelete?: () => UseMutationResult<any, Error, any, unknown>;
   onDetail?: (row: T) => void;
   fetchData: (payload: TPayloadTable) => UseQueryResult<TResPagination<T>, Error>;
};

export default function ContentAdmin<T>(props: TProps<T>) {
   const { columns, creates, updates, onCreate, onUpdate, onDelete, onDetail, fetchData, filters, sort = {}, title, heightScrollTable } = props;

   const [opened, { open, close }] = useDisclosure(false);
   const [openedModalDelete, handleModalDelete] = useDisclosure(false);

   const [editData, setEditData] = useState(null);
   const resolveRef = useRef<(value: any) => void>(null);
   const rejectRef = useRef<(value: any) => void>(null);

   const create = onCreate ? onCreate() : null;
   const update = onUpdate ? onUpdate() : null;
   const deletee = onDelete ? onDelete() : null;

   const waitForDelete = () => {
      return new Promise<any>((resolve, reject) => {
         handleModalDelete.open();
         resolveRef.current = resolve;
         rejectRef.current = reject;
      });
   };

   return (
      <>
         <Stack>
            <Group justify="space-between">
               <Title order={2} mb="md">
                  {title}
               </Title>
               {create && (
                  <Button
                     leftSection={<IconPlus />}
                     onClick={() => {
                        setEditData(null);
                        open();
                     }}
                  >
                     Create
                  </Button>
               )}
            </Group>
            <TableCustom<T>
               styleTableTh={{ textAlign: `center` }}
               styleTableTd={{ textAlign: `center` }}
               heightScroll={heightScrollTable}
               columns={columns}
               fetchData={fetchData}
               filters={filters}
               sort={sort}
               onDetail={onDetail}
               onEdit={
                  update
                     ? (item: any) => {
                          setEditData(item);
                          open();
                       }
                     : undefined
               }
               onDelete={
                  deletee
                     ? (item: any) => {
                          waitForDelete()
                             .then(() => {
                                console.log({ item });
                                deletee.mutate(item._id, {
                                   onSuccess: () => {
                                      handleModalDelete.close();
                                   },
                                });
                             })
                             .catch(() => {});
                       }
                     : undefined
               }
            />
         </Stack>
         <DrawerMutation
            opened={opened}
            editData={editData}
            updates={updates}
            creates={creates}
            update={update}
            create={create}
            setEditData={setEditData}
            close={close}
         />
         <Modal
            opened={openedModalDelete}
            onClose={handleModalDelete.close}
            styles={{ content: { borderRadius: `15px` } }}
            centered
            withCloseButton={false}
         >
            <Stack>
               <Text ta={`center`} size="lg" fw={`bold`}>
                  Are you sure you want to delete?
               </Text>
               <Center>
                  <Group>
                     <Button
                        onClick={() => {
                           if (rejectRef.current) {
                              rejectRef.current(false);
                              rejectRef.current = null;
                              handleModalDelete.close();
                           }
                        }}
                        variant="outline"
                        disabled={deletee?.isPending}
                        mr={10}
                     >
                        Cancel
                     </Button>
                     <Button
                        loading={deletee?.isPending}
                        onClick={() => {
                           if (resolveRef.current) {
                              resolveRef.current(true);
                              resolveRef.current = null;
                           }
                        }}
                     >
                        Submit
                     </Button>
                  </Group>
               </Center>
            </Stack>
         </Modal>
      </>
   );
}
