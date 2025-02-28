import { TMessageItem } from "@/types/chat.type";
import { Box, Group, Stack, Text } from "@mantine/core";
import * as emoji from "node-emoji";
import { formatLocalTime } from "../../../../../helpers/function.helper";
import classes from "./RecipientMessageItem.module.css";
import Avatar from "@/components/avatar/Avatar";
import { TUser } from "@/types/user.type";

type TProps = {
   messageItem: TMessageItem;
};

export default function RecipientMessageItem({ messageItem }: TProps) {
   return (
      <Group wrap="nowrap" gap={10} align="start" w={`95%`}>
         <Box style={{ flexShrink: 0 }}>
            <Avatar user={{ avatar: messageItem.avatar, fullName: messageItem.email, roleId: messageItem.roleId } as TUser} />
         </Box>
         <Stack className={`${classes[`box`]}`} gap={5}>
            <Text className={`${classes[`email`]}`}>{messageItem.email || `??`}</Text>
            <Text className={`${classes[`mes`]}`}>{emoji.emojify(messageItem.message)}</Text>
            <Text className={`${classes[`time`]}`}>{formatLocalTime()}</Text>
         </Stack>
      </Group>
   );
}
