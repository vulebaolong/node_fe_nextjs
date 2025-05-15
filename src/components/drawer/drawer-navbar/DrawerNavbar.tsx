import Avatar from "@/components/avatar/Avatar";
import UserAction from "@/components/user-action/UserAction";
import UserMenu from "@/components/user-menu/UserMenu";
import { ROUTER_CLIENT } from "@/constant/router.constant";
import { useAppSelector } from "@/redux/hooks";
import { Button, Center, Drawer, Group, ScrollArea, Stack } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import useRouter from "@/hooks/use-router-custom";

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
      <Drawer
         offset={8}
         styles={{
            content: {
               display: `flex`,
               flexDirection: `column`,
            },
            body: { flex: `1` },
         }}
         radius="lg"
         size="100%"
         opened={opened}
         onClose={close}
      >
         <Stack h={`100%`}>
            <ScrollArea flex={1}>
               <Center>
                  <Group gap={2} wrap="nowrap">
                     {info ? (
                        <Avatar user={info} />
                     ) : (
                        <Group>
                           <Button
                              onClick={() => {
                                 router.push(ROUTER_CLIENT.REGISTER);
                              }}
                              rightSection={<IconArrowRight size={15} />}
                              color="indigo"
                           >
                              {t("register")}
                           </Button>
                           <Button
                              className="cursor-pointer"
                              onClick={() => {
                                 router.push(ROUTER_CLIENT.LOGIN);
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

               <UserMenu />
            </ScrollArea>

            <UserAction />
         </Stack>
      </Drawer>
   );
}
