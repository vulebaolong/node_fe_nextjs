import SwitchLang from "@/components/switch-lang/SwitchLang";
import ButtonToggleTheme from "@/components/toggle-theme/button/ButtonToggleTheme";
import ROUTER from "@/constant/router.constant";
import { Accordion, Avatar, Button, Center, Drawer, Group, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Exploer from "./exploer/Exploer";
import Resources from "./resources/Resources";

const styleButtonNav = { border: `none`, background: `transparent` };

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function DrawerNavbar({ opened, close }: TProps) {
   const router = useRouter()
   const t = useTranslations();
   return (
      <Drawer offset={8} radius="lg" size="100%" opened={opened} onClose={close}>
         <Stack>
            <Accordion variant="filled" radius="md">
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
            </Accordion>

            <Button variant="default" color="indigo">
               Pricing
            </Button>
            <Button variant="default" color="indigo">
               For Business
            </Button>

            {/* right */}
            <Center>
               <Group gap={2} wrap="nowrap">
                  {false ? (
                     <Link className="cursor-pointer" href={ROUTER.ME}>
                        {" "}
                        <Avatar radius="xl" />
                     </Link>
                  ) : (
                     <Button
                        className="cursor-pointer"
                        onClick={() => {
                           router.push(ROUTER.LOGIN);
                        }}
                        style={styleButtonNav}
                        variant="default"
                        color="indigo"
                     >
                        {t("header.login")}
                     </Button>
                  )}
                  <Group wrap="nowrap" gap={5}>
                     {!false && (
                        <Button
                           onClick={() => {
                              router.push(ROUTER.REGISTER);
                           }}
                           color="indigo"
                        >
                           {t("header.joinMobile")}
                        </Button>
                     )}
                     <ButtonToggleTheme />
                     <SwitchLang />
                  </Group>
               </Group>
            </Center>
         </Stack>
      </Drawer>
   );
}
