import Avatar from "@/components/avatar/Avatar";
import { TMessageItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { Box, Group, Stack, Text } from "@mantine/core";
import * as emoji from "node-emoji";
import { formatLocalTime } from "../../../../../helpers/function.helper";
import classes from "./SenderMessageItem.module.css";

type TProps = {
   messageItem: TMessageItem;
};

export default function SenderMessageItem({ messageItem }: TProps) {
   return (
      <Group justify="end">
         <Group wrap="nowrap" justify="end" gap={10} align="start" w={`95%`}>
            <Stack className={`${classes[`box`]}`} gap={5}>
               <Text className={`${classes[`email`]}`}>{messageItem.email || `??`}</Text>
               <Text className={`${classes[`mes`]}`}>{emoji.emojify(messageItem.message)}</Text>
               <Text className={`${classes[`time`]}`}>{formatLocalTime()}</Text>
            </Stack>
            <Box style={{ flexShrink: 0 }}>
               <Avatar user={{ avatar: messageItem.avatar, fullName: messageItem.email, roleId: messageItem.roleId } as TUser} />
            </Box>
         </Group>
      </Group>
   );
}
