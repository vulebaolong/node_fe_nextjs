import { TUser } from "@/types/user.type";
import { Group, MantineSize, Text } from "@mantine/core";
import Avatar from "../avatar/Avatar";

type TProps = {
   user?: TUser | null | undefined;
   fw?: string;
   size?: number | (string & {}) | MantineSize | undefined;
};

export default function TagUser({ user, fw = `normal`, size = `md` }: TProps) {
   return (
      <Group wrap="nowrap" gap={5}>
         <Avatar size={size} user={user} />
         <Text fw={fw} truncate>
            {user?.fullName}
         </Text>
      </Group>
   );
}
