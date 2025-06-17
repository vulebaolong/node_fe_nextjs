import { Box, Group, MantineSize, Text } from "@mantine/core";
import Avatar from "../avatar/Avatar";

type TProps = {
   fw?: string;
   sizeAvatar?: number | (string & {}) | MantineSize | undefined;
   fullName?: string;
   avatar?: string;
   roleId?: number;
};

export default function TagUser({ fullName, avatar, roleId, fw = `normal`, sizeAvatar = `md` }: TProps) {
   return (
      <Group wrap="nowrap" gap={5}>
         <Box sx={{ flexShrink: 0 }}>
            <Avatar size={sizeAvatar} fullName={fullName} avatar={avatar}  />
         </Box>
         <Text fw={fw} truncate>
            {fullName}
         </Text>
      </Group>
   );
}
