"use client";

import ROUTER from "@/constant/router.constant";
import { usePermissionGroupByModule } from "@/tantask/permission.tanstack";
import { useDetailRole, useTogglePermission } from "@/tantask/role.tanstack";
import { Accordion, ActionIcon, Badge, Box, Container, Group, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { resError } from "../../../helpers/function.helper";
import classes from "./RoleDetail.module.css";

export default function RoleDetail() {
   const { id } = useParams<{ id: string }>();

   const router = useRouter();
   const queryClient = useQueryClient();

   const detailRole = useDetailRole(id || `0`);
   const permissionGroupByModule = usePermissionGroupByModule(id || `0`);
   const togglePermission = useTogglePermission();

   console.log(`abc`, permissionGroupByModule.data);

   const handleClickSwitch = (permissionId: number) => {
      if (!id) return;
      togglePermission.mutate(
         {
            permissionId: permissionId,
            roleId: Number(id),
         },
         {
            onSuccess: (data) => {
               console.log({ data });
               queryClient.invalidateQueries({ queryKey: [`permission-by-module`] });
               toast.success(`${data?.isActive ? `On` : `Off`} Permission Successfully`);
            },
            onError: (error: any) => {
               console.log(error);
               toast.error(resError(error, `Toggle permission failed`));
            },
         }
      );
   };

   return (
      <Container py={100}>
         <Stack gap={50}>
            <ActionIcon
               onClick={() => {
                  router.push(ROUTER.ROLE);
               }}
               variant="light"
               radius={`xl`}
            >
               <IconArrowBack style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>

            <Paper shadow="md" radius="lg" withBorder p="xl">
               <Stack>
                  <Group align="center">
                     <Title>{detailRole.data?.name}</Title>
                     <Switch
                        checked={detailRole.data?.isActive}
                        onLabel={`ON`}
                        offLabel={`OFF`}
                        styles={{
                           track: {
                              cursor: `pointer`,
                           },
                        }}
                     />
                  </Group>
                  <Text c="dimmed">{detailRole.data?.description}</Text>

                  <Accordion multiple variant="contained" radius="md">
                     {Object.entries(permissionGroupByModule.data || {}).map(([key, permissions], i1) => (
                        <Accordion.Item key={i1} value={key}>
                           <Accordion.Control>{key}</Accordion.Control>
                           <Accordion.Panel>
                              <Box className={`${classes.moduleWrap}`}>
                                 {permissions.map((permission, i2) => {
                                    // console.log({ permission });
                                    return (
                                       <Paper className={`${classes[`box-1`]}`} shadow="xs" withBorder radius="md" key={i2}>
                                          <Group wrap="nowrap" justify="space-between" gap={0}>
                                             <Stack>
                                                <Group wrap="nowrap" gap={5}>
                                                   <Title order={6}>
                                                      <Text className={`${classes[`max-width-1`]}`} truncate inherit>
                                                         {permission.name}
                                                      </Text>
                                                   </Title>
                                                   <Badge
                                                      size="lg"
                                                      variant="light"
                                                      color={(() => {
                                                         if (permission.method === `POST`) return `yellow`;
                                                         if (permission.method === `PUT`) return `blue`;
                                                         if (permission.method === `PATCH`) return `violet`;
                                                         if (permission.method === `DELETE`) return `red`;
                                                         return `green`;
                                                      })()}
                                                   >
                                                      {permission.method}
                                                   </Badge>
                                                </Group>

                                                <Text fz={12} truncate className={`${classes[`max-width-2`]}`} c="dimmed" fs="italic" w={`auto`}>
                                                   {permission.endpoint}
                                                </Text>
                                             </Stack>

                                             <Switch
                                                disabled={togglePermission.isPending}
                                                onClick={() => {
                                                   handleClickSwitch(permission.id);
                                                }}
                                                onLabel={`ON`}
                                                offLabel={`OFF`}
                                                checked={!!permission.isActive}
                                                styles={{
                                                   track: {
                                                      cursor: `pointer`,
                                                   },
                                                }}
                                             />
                                          </Group>
                                       </Paper>
                                    );
                                 })}
                              </Box>
                           </Accordion.Panel>
                        </Accordion.Item>
                     ))}
                  </Accordion>
               </Stack>
            </Paper>
         </Stack>
      </Container>
   );
}
