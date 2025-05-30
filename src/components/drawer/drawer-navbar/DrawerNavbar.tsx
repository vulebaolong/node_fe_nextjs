import { Center, Drawer, Stack } from "@mantine/core";

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function DrawerNavbar({ opened, close }: TProps) {
   // const router = useRouter();
   // const t = useTranslations();
   return (
      <Drawer offset={8} radius="lg" size="100%" opened={opened} onClose={close}>
         <Center>
            <Stack maw={`70%`} w={`100%`}>
               {/* {listNav.map((item) => {
                  return (
                     <Button
                        key={item.id}
                        variant="default"
                        color="indigo"
                        onClick={() => {
                           router.push(`/${ROUTER_CLIENT.HOME}#${item.id}`);
                           close();
                        }}
                     >
                        {item.title}
                     </Button>
                  );
               })} */}
            </Stack>
         </Center>
      </Drawer>
   );
}
