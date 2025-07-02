"use client";

import GlowCard from "@/components/card/GlowCard";
import DrawerListChat from "@/components/drawer/drawer-list-chat/DrawerListChat";
import DrawerNavbar from "@/components/drawer/drawer-navbar/DrawerNavbar";
import { Logo } from "@/components/logo/Logo";
import ModalSearchUser from "@/components/modal/modal-search-user/ModalSearchUser";
import UserControl from "@/components/user-control/UserControl";
import { MOBILE_VISIBLE_DESKTOP_HIDDEN } from "@/constant/app.constant";
import { hexToRgba } from "@/helpers/function.helper";
import { useGetInfoQuery } from "@/api/tantask/auth.tanstack";
import { ActionIcon, Box, Burger, Button, Group, Text, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMessengerFilled, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function HeaderClient() {
   // const t = useTranslations(`header`);
   const [opened, handleDrawerNavbar] = useDisclosure(false);
   const [openedSearchUser, handleSearchUser] = useDisclosure(false);
   const [openedListChat, handleDrawerListChat] = useDisclosure(false);
   // const router = useRouter();
   useGetInfoQuery();

   return (
      <>
         <header
            style={{
               backgroundColor: `var(--mantine-color-body)`,
               height: `var(--height-header)`,
               position: `fixed`,
               top: 0,
               left: 0,
               right: 0,
               zIndex: 101,
               borderBottom: `1px solid var(--mantine-color-gray-light)`,
               padding: `0px 20px`,
            }}
         >
            <Group
               sx={{
                  justifyContent: `space-between`,
                  height: `100%`,
                  flexWrap: `nowrap`,
               }}
            >
               {/* left */}
               <Group gap={2} wrap="nowrap">
                  <Box className={` ${MOBILE_VISIBLE_DESKTOP_HIDDEN}`}>
                     <Burger size={"sm"} opened={opened} onClick={handleDrawerNavbar.open} />
                  </Box>

                  <Group>
                     <Logo />
                     <Button
                        onClick={handleSearchUser.open}
                        c={"dimmed"}
                        leftSection={<IconSearch size={16} />}
                        variant="default"
                        radius="xl"
                        size="md"
                     >
                        <Text size="sm" fw={400}>
                           Tìm kiếm người dùng
                        </Text>
                     </Button>
                  </Group>
               </Group>

               {/* <Group
                  style={{
                     position: `absolute`,
                     top: `50%`,
                     left: `50%`,
                     transform: `translate(-50%, -50%)`,
                     height: `100%`,
                  }}
                  h={`100%`}
                  gap={10}
                  className={`${MOBILE_HIDDEN_DESKTOP_VISIBLE}`}
               >
                  <ActionIcon
                     onClick={() => {
                        router.push(ROUTER_CLIENT.HOME);
                     }}
                     w={`80px`}
                     h={`80%`}
                     variant="subtle"
                     color="gray"
                  >
                     <IconHome style={{ width: "50%", height: "50%" }} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon w={`80px`} h={`80%`} variant="subtle" color="gray">
                     <IconBrandRumble style={{ width: "50%", height: "50%" }} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon w={`80px`} h={`80%`} variant="subtle" color="gray">
                     <IconBuildingStore style={{ width: "50%", height: "50%" }} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon w={`80px`} h={`80%`} variant="subtle" color="gray">
                     <IconUsersGroup style={{ width: "50%", height: "50%" }} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon w={`80px`} h={`80%`} variant="subtle" color="gray">
                     <IconDeviceGamepad style={{ width: "50%", height: "50%" }} stroke={1.5} />
                  </ActionIcon>
               </Group> */}

               {/* right */}
               <Group>
                  <UserControl />
                  <ActionIcon
                     sx={{ cursor: "pointer" }}
                     onClick={handleDrawerListChat.open}
                     radius={"xl"}
                     className={`${MOBILE_VISIBLE_DESKTOP_HIDDEN}`}
                     variant="default"
                  >
                     <IconBrandMessengerFilled color="var(--mantine-color-blue-filled)" style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </Group>
         </header>
         <DrawerNavbar opened={opened} close={handleDrawerNavbar.close} />
         <DrawerListChat opened={openedListChat} close={handleDrawerListChat.close} />
         <ModalSearchUser opened={openedSearchUser} close={handleSearchUser.close} />
      </>
   );
}
