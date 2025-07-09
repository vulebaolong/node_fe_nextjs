import { Button, Center, Group, Stack } from "@mantine/core";
import SwitchLang from "../switch-lang/SwitchLang";
import ButtonToggleTheme from "../toggle-theme/button/ButtonToggleTheme";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "@/api/core.api";

type TProps = {
   className?: string | undefined;
   textAlign?: "center" | "left" | "right";
};

export default function UserAction({ className, textAlign = "center" }: TProps) {
   return (
      <Stack className={className}>
         <Center>
            <Group>
               <ButtonToggleTheme />
               <SwitchLang />
            </Group>
         </Center>
         <Button
            size="xs"
            onClick={() => {
               logout();
            }}
            color="red"
            variant="light"
            styles={{ inner: { justifyContent: textAlign } }}
            leftSection={<IconLogout size={14} />}
         >
            Đăng xuất
         </Button>
      </Stack>
   );
}
