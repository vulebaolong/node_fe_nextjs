"use client";

import DrawerNavbar from "@/components/drawer/drawer-navbar/DrawerNavbar";
import SwitchLang from "@/components/switch-lang/SwitchLang";
import ButtonToggleTheme from "@/components/toggle-theme/button/ButtonToggleTheme";
import { MOBILE_HIDDEN_DESKTOP_VISIBLE, MOBILE_VISIBLE_DESKTOP_HIDDEN } from "@/constant/app.constant";
import ROUTER from "@/constant/router.constant";
import { useAppSelector } from "@/redux/hooks";
import { useQueryInfo } from "@/tantask/auth.tanstack";
import { ActionIcon, Box, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMessengerFilled, IconBrandRumble, IconBuildingStore, IconDeviceGamepad, IconHome, IconUsersGroup } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import DrawerListChat from "../drawer/drawer-list-chat/DrawerListChat";
import { Logo } from "../logo/Logo";
import UserControl from "../user-control/UserControl";
import classes from "./HeaderClient.module.css";

const styleButtonNav = { border: `none`, background: `transparent` };

export default function HeaderClient() {
   const t = useTranslations(`header`);
   const [opened, handleDrawerNavbar] = useDisclosure(false);
   const [openedListChat, handleDrawerListChat] = useDisclosure(false);
   const info = useAppSelector((state) => state.user.info);
   const router = useRouter();
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

               <Group
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
                        router.push(ROUTER.HOME);
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
               </Group>

               {/* right */}
               <Group gap={5} wrap="nowrap" className={`${MOBILE_HIDDEN_DESKTOP_VISIBLE}`}>
                  {info ? (
                     <UserControl />
                  ) : (
                     <Group>
                        <Button
                           onClick={() => {
                              router.push(ROUTER.REGISTER);
                           }}
                           color="indigo"
                        >
                           {t("register")}
                        </Button>
                        <Button
                           className="cursor-pointer"
                           onClick={() => {
                              router.push(ROUTER.LOGIN);
                           }}
                           style={styleButtonNav}
                           variant="default"
                           color="indigo"
                        >
                           {t("login")}
                        </Button>
                        <ButtonToggleTheme />
                        <SwitchLang />
                     </Group>
                  )}
               </Group>
               <ActionIcon onClick={handleDrawerListChat.open} radius={"xl"} className={`${MOBILE_VISIBLE_DESKTOP_HIDDEN}`} variant="default">
                  <IconBrandMessengerFilled style={{ width: "70%", height: "70%" }} stroke={1.5} />
               </ActionIcon>
            </Group>
         </header>
         <DrawerNavbar opened={opened} close={handleDrawerNavbar.close} />
         <DrawerListChat opened={openedListChat} close={handleDrawerListChat.close} />
      </>
   );
}
