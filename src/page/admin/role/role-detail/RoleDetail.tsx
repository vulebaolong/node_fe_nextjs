"use client";

import Paper from "@/components/custom/paper/PaperCustom";
import { SwitchCustom } from "@/components/custom/switch/SwitchCustom";
import useRouter from "@/hooks/use-router-custom";
import { useListPermissionByRole } from "@/api/tantask/permission.tanstack";
import { useDetailRole, useToggleRole, useToggleRolePermission } from "@/api/tantask/role.tanstack";
import { Accordion, ActionIcon, Badge, Box, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { resError } from "../../../../helpers/function.helper";

export default function RoleDetail() {
   const { id } = useParams<{ id: string }>();

   const router = useRouter();
   const queryClient = useQueryClient();

   const detailRole = useDetailRole(id || `0`);
   const permissionGroupByModule = useListPermissionByRole(id || `0`);
   const toggleRolePermission = useToggleRolePermission();
   const toggleRole = useToggleRole();

   const handleToggleRolePermission = async (permissionId: string) => {
      if (!id) return;

      return new Promise((resolve, reject) => {
         toggleRolePermission.mutate(
            {
               permissionId: permissionId,
               roleId: id,
            },
            {
               onSuccess: (data) => {
                  queryClient.invalidateQueries({ queryKey: [`list-permission-by-role`] });
                  toast.success(`${data?.isActive ? `On` : `Off`} Permission Successfully`);
                  resolve(data);
               },
               onError: (error: any) => {
                  console.log(error);
                  toast.error(resError(error, `Toggle permission failed`));
                  reject(error);
               },
            }
         );
      });
   };

   const handleToggleRole = async (id: string) => {
      if (!id) return;

      return new Promise((resolve, reject) => {
         toggleRole.mutate(
            {
               roleId: id,
            },
            {
               onSuccess: (data) => {
                  console.log({ data });
                  queryClient.invalidateQueries({ queryKey: ["detail-role"] });
                  toast.success(`${data?.isActive ? "On" : "Off"} Role Successfully`);
                  resolve(data);
               },
               onError: (error: any) => {
                  console.log(error);
                  toast.error(resError(error, "Toggle Role Failed"));
                  reject(error);
               },
            }
         );
      });
   };

   return (
      <Stack gap={50}>
         <ActionIcon
            onClick={() => {
               router.back();
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
                  <SwitchCustom
                     initialChecked={detailRole.data?.isActive}
                     onToggle={() => handleToggleRole(id)}
                     onLabel="ON"
                     offLabel="OFF"
                     styles={{
                        track: {
                           cursor: `pointer`,
                        },
                     }}
                  />
                  {/* {toggleRole.isPending && <Loader size={`xs`} />} */}
               </Group>
               <Text c="dimmed">{detailRole.data?.description}</Text>

               <Accordion multiple variant="contained" radius="md">
                  {Object.entries(permissionGroupByModule.data?.items || {}).map(([key, permissions], i1) => (
                     <Accordion.Item key={i1} value={key}>
                        <Accordion.Control>{key}</Accordion.Control>
                        <Accordion.Panel>
                           <Box
                              sx={(_, u) => {
                                 return {
                                    gap: `20px`,
                                    display: `grid`,
                                    [u.largerThan(`md`)]: {
                                       gridTemplateColumns: `1fr 1fr`,
                                    },
                                    [u.smallerThan(`md`)]: {
                                       gridTemplateColumns: `1fr`,
                                    },
                                 };
                              }}
                           >
                              {permissions.map((permission, i2) => {
                                 // console.log({ permission });
                                 return (
                                    <Paper sx={{ padding: `20px` }} shadow="xs" withBorder radius="md" key={i2}>
                                       <Group wrap="nowrap" justify="space-between" gap={0}>
                                          <Stack>
                                             <Group wrap="nowrap" gap={5}>
                                                <Title order={6}>
                                                   <Text
                                                      sx={(_, u) => {
                                                         return {
                                                            [u.largerThan(`md`)]: {
                                                               maxWidth: `175px`,
                                                            },
                                                            [u.smallerThan(`md`)]: {
                                                               maxWidth: `100px`,
                                                            },
                                                         };
                                                      }}
                                                      truncate
                                                      inherit
                                                   >
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

                                             <Text fz={12} truncate sx={{ maxWidth: `200px` }} c="dimmed" fs="italic" w={`auto`}>
                                                {permission.endpoint}
                                             </Text>
                                          </Stack>

                                          <SwitchCustom
                                             initialChecked={permission.isActive}
                                             onToggle={() => handleToggleRolePermission(permission.id)}
                                             onLabel="ON"
                                             offLabel="OFF"
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
   );
}
