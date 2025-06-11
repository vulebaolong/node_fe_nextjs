"use client";

import Avatar from "@/components/avatar/Avatar";
import Paper from "@/components/custom/paper/PaperCustom";
import { logout } from "@/helpers/api.helper";
import { useAppSelector } from "@/redux/hooks";
import {  Button, Group, Stack, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function SettingAccount() {
   const info = useAppSelector((state) => state.user.info);
   const t = useTranslations("setting");

   return (
      <>
         <Title
            order={2}
            mt="sm"
            sx={{
               fontWeight: 900,
               fontSize: `clamp(20px, 3vw, 28px)`,
            }}
         >
            {t(`Account`)}
         </Title>

         <Paper shadow="sm">
            <Group sx={{ width: `100%`, justifyContent: `space-between` }}>
               <Group
                  sx={{
                     flexWrap: `nowrap`,
                     padding: `5px 10px`,
                     borderRadius: `10px`,
                     gap: 10,
                  }}
               >
                  <Avatar size={`md`} user={info} color="initials" />
                  <Stack gap={0}>
                     <Text truncate sx={{ fontWeight: 900, fontSize: `16px`, maxWidth: `130px` }}>
                        {info?.fullName}
                     </Text>
                     <Text truncate sx={{ maxWidth: `130px`, fontSize: `12px`, opacity: 0.5 }}>
                        {info?.email}
                     </Text>
                  </Stack>
               </Group>
               <Button onClick={logout} variant="default" radius="xl">
                  {t(`Logout`)}
               </Button>
            </Group>
         </Paper>
      </>
   );
}
