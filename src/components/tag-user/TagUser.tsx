import { TUser } from "@/types/user.type";
import { Group, Text } from "@mantine/core";
import Avatar from "../avatar/Avatar";

type TProps = {
   user?: TUser | null | undefined;
   fw?: string;
};

export default function TagUser({ user, fw = `normal` }: TProps) {
   return (
      <Group wrap="nowrap">
         <Avatar style={{ width: `36px`, height: `36px`, minWidth: `36px` }} user={user} />
         <Text fw={fw} truncate>
            {user?.fullName}
         </Text>
      </Group>
   );
}
