import { Box, Group, MantineSize, Text } from "@mantine/core";
import Avatar from "../avatar/Avatar";

type TProps = {
   fw?: string;
   sizeAvatar?: number | (string & {}) | MantineSize | undefined;
   fullName?: string;
   avatar?: string;
};

export default function TagUser({ fullName, avatar, fw = `normal`, sizeAvatar = `md` }: TProps) {
   // console.log({ fullName });
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
