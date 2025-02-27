import { Group, Text } from "@mantine/core";
import { TUser } from "@/types/user.type";
import Avatar from "../avatar/Avatar";

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
