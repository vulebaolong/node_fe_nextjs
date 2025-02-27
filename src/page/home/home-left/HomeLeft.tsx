"use client";

import TagUser from "@/components/tag-user/TagUser";
import { useAppSelector } from "@/redux/hooks";
import { Stack } from "@mantine/core";

export default function HomeLeft() {
   const info = useAppSelector((state) => state.user.info);
   return (
      <Stack>
         <TagUser user={info} />
      </Stack>
   );
}
