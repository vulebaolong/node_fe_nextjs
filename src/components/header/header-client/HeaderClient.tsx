"use client";

import DrawerListChat from "@/components/drawer/drawer-list-chat/DrawerListChat";
import DrawerNavbar from "@/components/drawer/drawer-navbar/DrawerNavbar";
import { Logo } from "@/components/logo/Logo";
import UserControl from "@/components/user-control/UserControl";
import { MOBILE_VISIBLE_DESKTOP_HIDDEN } from "@/constant/app.constant";
import { useQueryInfo } from "@/tantask/auth.tanstack";
import { ActionIcon, Box, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMessengerFilled } from "@tabler/icons-react";
import classes from "./HeaderClient.module.css";

export default function HeaderClient() {
   // const t = useTranslations(`header`);
   const [opened, handleDrawerNavbar] = useDisclosure(false);
   const [openedListChat, handleDrawerListChat] = useDisclosure(false);
   // const router = useRouter();
   useQueryInfo();

   return (
      <>
         <header className={`${classes[`header`]}`}>
            <Group justify="space-between" h={`100%`} wrap="nowrap">
               {/* left */}
               <Group gap={2} wrap="nowrap">
                  <Box className={` ${MOBILE_VISIBLE_DESKTOP_HIDDEN}`}>
                     <Burger size={"sm"} opened={opened} onClick={handleDrawerNavbar.open} />
                  </Box>

                  <Logo />
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
                  <ActionIcon onClick={handleDrawerListChat.open} radius={"xl"} className={`${MOBILE_VISIBLE_DESKTOP_HIDDEN}`} variant="default">
                     <IconBrandMessengerFilled color="indigo" style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </Group>
         </header>
         <DrawerNavbar opened={opened} close={handleDrawerNavbar.close} />
         <DrawerListChat opened={openedListChat} close={handleDrawerListChat.close} />
      </>
   );
}
