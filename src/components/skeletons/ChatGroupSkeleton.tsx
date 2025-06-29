import { Group, Skeleton, Stack } from "@mantine/core";
import React from "react";

export default function ChatGroupSkeleton({ ...props }: any) {
   return (
      <Stack gap={5} sx={{ position: `absolute`, top: 0, left: 0, width: `100%`, height: `100%` }} {...props}>
         {Array.from({ length: 5 }).map((_, i) => {
            return (
               <Group key={i} sx={{ gap: 5, alignItems: `center`, height: `48px`, flexWrap: `nowrap` }}>
                  <Skeleton sx={{ flexShrink: 0, height: `38px`, width: `38px` }} circle />
                  <Skeleton height={15} radius="xl" />
               </Group>
            );
         })}
      </Stack>
   );
}
