import Avatar from "@/components/avatar/Avatar";
import { formatLocalTime } from "@/helpers/function.helper";
import { TMessageItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { Box, Group, Stack, Text } from "@mantine/core";
import * as emoji from "node-emoji";

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
            <Avatar size={`sm`} fullName={messageItem.fullName} avatar={messageItem.avatar} />
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
               {formatLocalTime(messageItem.createdAt)}
            </Text>
         </Stack>
      </Group>
   );
}
