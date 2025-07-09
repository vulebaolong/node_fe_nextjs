import { Stack } from "@mantine/core";
import AvatarSkeleton from "./AvatarSkeleton";

export default function ChatGroupSkeleton({ ...props }: any) {
   return (
      <Stack gap={5} sx={{ position: `absolute`, top: 0, left: 0, width: `100%`, height: `100%` }} {...props}>
         {Array.from({ length: 5 }).map((_, i) => {
            return (
               <AvatarSkeleton key={i} />
            );
         })}
      </Stack>
   );
}
