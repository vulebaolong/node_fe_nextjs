import HomeRight from "@/page/home/home-right/HomeRight";
import { Drawer } from "@mantine/core";

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function DrawerListChat({ opened, close }: TProps) {
   return (
      <Drawer offset={8} radius="lg" size="100%" opened={opened} onClose={close}>
         <HomeRight onClose={close} />
      </Drawer>
   );
}
