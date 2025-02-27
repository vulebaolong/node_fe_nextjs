"use client";

import { Avatar } from "@/components/avatar/Avatar";
import TagUser from "@/components/tag-user/TagUser";
import { useAppSelector } from "@/redux/hooks";
import { useFindAllUser } from "@/tantask/user.tanstack";
import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Fragment } from "react";

export default function HomeRight() {
   const findAllUser = useFindAllUser();
   const userId = useAppSelector((state) => state.user.info?.id);
   return (
      <Stack>
         <Group justify="space-between">
            <Text opacity={0.7} fw={`bold`} fz={`lg`}>
               Người Liên Hệ
            </Text>
            <ActionIcon variant="subtle" radius="xl">
               <IconSearch style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
         </Group>
         <Stack>
            {findAllUser.data?.items.map((user, i) => {
               if (user.id === userId) return <Fragment key={i}></Fragment>;
               return <TagUser key={i} user={user} />;
            })}
         </Stack>
      </Stack>
   );
}
