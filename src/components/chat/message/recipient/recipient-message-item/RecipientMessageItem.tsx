import Avatar from "@/components/avatar/Avatar";
import { TMessageItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { Box, Group, Stack, Text } from "@mantine/core";
import * as emoji from "node-emoji";
import { formatLocalTime } from "../../../../../helpers/function.helper";

type TProps = {
   messageItem: TMessageItem;
};

export default function RecipientMessageItem({ messageItem }: TProps) {
   return (
      <Group
         sx={{
            flexWrap: `nowrap`,
            gap: 10,
            alignItems: `start`,
            width: `70%`,
            padding: `2px 10px`,
         }}
      >
         <Box style={{ flexShrink: 0 }}>
            <Avatar size={`sm`} user={{ avatar: messageItem.avatar, fullName: messageItem.email, roleId: messageItem.roleId } as TUser} />
         </Box>
         <Stack
            sx={(_, u) => {
               return {
                  padding: "10px",
                  borderRadius: "10px",
                  [u.dark]: {
                     backgroundColor: "rgb(35, 37, 41)",
                  },
                  [u.light]: {
                     backgroundColor: "rgb(250, 250, 250)",
                  },
                  minWidth: "100px",
                  gap: 5,
               };
            }}
         >
            {/* <Text
               sx={{
                  color: "#C37900",
                  fontSize: `12px`,
                  fontWeight: 700,
                  whiteSpace: `pre-wrap`,
                  unicodeBidi: `isolate`,
                  wordWrap: `break-word`,
                  wordBreak: `break-word`,
               }}
            >
               {messageItem.email || `??`}
            </Text> */}
            <Text
               sx={(_, u) => {
                  return {
                     [u.dark]: {
                        color: `white`,
                     },
                     [u.light]: {
                        color: `black`,
                     },
                     fontSize: `14px`,
                     fontWeight: 400,
                     whiteSpace: `pre-wrap`,
                     unicodeBidi: `isolate`,
                     wordWrap: `break-word`,
                     wordBreak: `break-word`,
                  };
               }}
            >
               {emoji.emojify(messageItem.message)}
            </Text>
            <Text
               sx={(_, u) => {
                  return {
                     fontSize: `10px`,
                     fontWeight: 400,
                     whiteSpace: `pre-wrap`,
                     unicodeBidi: `isolate`,
                     wordWrap: `break-word`,
                     wordBreak: `break-word`,
                     [u.dark]: {
                        color: `rgba(255,255,255, 0.5)`,
                     },
                     [u.light]: {
                        color: `rgba(0,0,0, 0.5)`,
                     },
                  };
               }}
            >
               {formatLocalTime()}
            </Text>
         </Stack>
      </Group>
   );
}
