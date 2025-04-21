import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import SwitchLang from "@/components/switch-lang/SwitchLang";
import ButtonToggleTheme from "@/components/toggle-theme/button/ButtonToggleTheme";
import ROUTER from "@/constant/router.constant";
import { logout } from "@/helpers/api.helper";
import { effectText } from "@/helpers/motion.helper";
import { useAppSelector } from "@/redux/hooks";
import { Button, Center, Divider, Drawer, Group, Stack, Text } from "@mantine/core";
import { IconArrowRight, IconSettings, IconUserCheck, IconUserSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import classes from "./DrawerNavbar.module.css";

const styleButtonNav = { border: `none`, background: `transparent` };

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function DrawerNavbar({ opened, close }: TProps) {
   const router = useRouter();
   const info = useAppSelector((state) => state.user.info);
   const t = useTranslations(`header`);
   return (
      <Drawer offset={8} radius="lg" size="100%" opened={opened} onClose={close}>
         <Stack>
            <Center>
               <Group gap={2} wrap="nowrap">
                  {info ? (
                     <Avatar user={info} />
                  ) : (
                     <Group>
                        <Button
                           onClick={() => {
                              router.push(ROUTER.REGISTER);
                           }}
                           rightSection={<IconArrowRight size={15} />}
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
                     </Group>
                  )}
               </Group>
            </Center>

            {/* <Accordion variant="filled" radius="md">
               <Accordion.Item value="EXPLOER">
                  <Accordion.Control>
                     <Text fw={900}>EXPLOER</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                     <Exploer />
                  </Accordion.Panel>
               </Accordion.Item>

               <Accordion.Item value="RESOURCES">
                  <Accordion.Control>
                     <Text fw={900}>RESOURCES</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                     <Resources />
                  </Accordion.Panel>
               </Accordion.Item>
            </Accordion> */}

            <Center className={classes.textAvatar}>
               <Badge user={info} w={`100%`} />
            </Center>

            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs" component="div">
                  {effectText(`Name`)}
               </Text>
               <Text component="span" size="xs" truncate="end">
                  {info?.fullName}
               </Text>
            </Group>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs" component="div">
                  {effectText(`Email`)}
               </Text>
               <Text span size="xs" truncate="end">
                  {info?.email}
               </Text>
            </Group>

            <Button
               onClick={() => {
                  router.push(ROUTER.ROLE);
               }}
               variant="default"
               color="indigo"
               leftSection={<IconUserCheck size={14} />}
            >
               Role
            </Button>
            <Button
               onClick={() => {
                  router.push(ROUTER.PROFILE);
               }}
               leftSection={<IconUserSearch size={14} />}
               variant="default"
               color="indigo"
            >
               Profile
            </Button>
            <Button
               onClick={() => {
                  router.push(ROUTER.SETTING);
               }}
               leftSection={<IconSettings size={14} />}
               variant="default"
               color="indigo"
            >
               Settings
            </Button>

            <Divider />

            <Center>
               <Group wrap="nowrap" gap={5}>
                  <ButtonToggleTheme />
                  <SwitchLang />
               </Group>
            </Center>
         </Stack>
         <Button
            onClick={() => {
               logout();
            }}
            w={`calc(100% - 32px)`}
            color="red"
            variant="subtle"
            style={{ position: `absolute`, bottom: 16, left: `50%`, transform: `translateX(-50%)` }}
         >
            Logout
         </Button>
      </Drawer>
   );
}
