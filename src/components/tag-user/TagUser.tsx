import { Group, Text } from "@mantine/core";
import { Avatar } from "../avatar/Avatar";
import { TUser } from "@/types/user.type";

type TProps = {
   user?: TUser | null | undefined
}

export default function TagUser({ user }: TProps) {
   return (
      <Group wrap="nowrap">
         <Avatar user={user} />
         <Text fw={`bold`} truncate>
            {user?.fullName}
         </Text>
      </Group>
   );
}
