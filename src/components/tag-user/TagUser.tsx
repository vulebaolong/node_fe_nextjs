import { Group, StyleProp, Text } from "@mantine/core";
import { TUser } from "@/types/user.type";
import Avatar from "../avatar/Avatar";

type TProps = {
   user?: TUser | null | undefined;
   fw?: string;
};

export default function TagUser({ user, fw = `normal` }: TProps) {
   return (
      <Group wrap="nowrap">
         <Avatar user={user} />
         <Text fw={fw} truncate>
            {user?.fullName}
         </Text>
      </Group>
   );
}
