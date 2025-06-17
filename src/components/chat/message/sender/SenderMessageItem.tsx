import { formatLocalTime } from "@/helpers/function.helper";
import { TMessageItem } from "@/types/chat.type";
import { Group, Stack, Text } from "@mantine/core";
import * as emoji from "node-emoji";

type TProps = {
   messageItem: TMessageItem;
};

export default function SenderMessageItem({ messageItem }: TProps) {
   return (
      <Group
         sx={{
            justifyContent: `end`,
            padding: `2px 10px`,
         }}
      >
         <Group wrap="nowrap" justify="end" gap={10} align="start" w={`70%`}>
            <Stack
               sx={{
                  padding: "8px 12px",
                  borderRadius: `18px`,
                  backgroundImage: `linear-gradient(#aa00ff calc(100vh - 455px + 48px), #0070f6 calc(100% - 56px), #0070f6)`,
                  backgroundColor: `transparent`,
                  backgroundAttachment: `fixed`,
                  minWidth: `100px`,
                  gap: 0,
               }}
            >
               <Text
                  sx={{
                     color: `white`,
                     fontSize: `14px`,
                     fontWeight: 400,
                     whiteSpace: `pre-wrap`,
                     unicodeBidi: `isolate`,
                     wordWrap: `break-word`,
                     wordBreak: `break-word`,
                  }}
               >
                  {emoji.emojify(messageItem.message)}
               </Text>
               <Text
                  sx={{
                     fontSize: `10px`,
                     color: `rgba(255,255,255, 0.5)`,
                     fontWeight: 400,
                     whiteSpace: `pre-wrap`,
                     unicodeBidi: `isolate`,
                     wordWrap: `break-word`,
                     wordBreak: `break-word`,
                  }}
               >
                  {formatLocalTime(messageItem.createdAt)}
               </Text>
            </Stack>
         </Group>
      </Group>
   );
}
