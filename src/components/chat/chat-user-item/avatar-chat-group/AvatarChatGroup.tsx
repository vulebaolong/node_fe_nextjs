import Avatar from "@/components/avatar/Avatar";
import { useAppSelector } from "@/redux/hooks";
import { TStateChat } from "@/types/chat.type";
import { Box, Group, Text } from "@mantine/core";

type TProps = {
   stateChat: TStateChat;
   isTextName?: boolean;
   width?: string;
   height?: string;
};

export default function AvatarChatGroup({ stateChat, isTextName = false, width = `40px`, height = `40px` }: TProps) {
   const userId = useAppSelector((state) => state.user.info?._id);

   const memberRecipient = () => {
      return stateChat.chatGroupMembers.find((member) => member.userId !== userId);
   };
   return (
      <Group wrap="nowrap" gap={5}>
         {stateChat.chatGroupMembers.length > 2 ? (
            <>
               <Box sx={{ position: `relative`, flexShrink: 0, width: width, height: height }}>
                  {(stateChat.chatGroupMembers || []).slice(0, 2).map((member, i) => {
                     if (i === 0) {
                        return (
                           <Box key={i} sx={{ position: `absolute`, bottom: 0, left: 0, zIndex: 2, width: `70%`, height: `70%` }}>
                              <Avatar
                                 size={30}
                                 style={{ width: `100%`, height: `100%`, borderRadius: `50%`, minWidth: `unset` }}
                                 fullName={member.fullName}
                                 avatar={member.avatar}
                              />
                           </Box>
                        );
                     } else {
                        return (
                           <Box key={i} sx={{ position: `absolute`, top: 0, right: 0, zIndex: 1, width: `70%`, height: `70%` }}>
                              <Avatar
                                 size={30}
                                 style={{ width: `100%`, height: `100%`, borderRadius: `50%`, minWidth: `unset` }}
                                 fullName={member.fullName}
                                 avatar={member.avatar}
                              />
                           </Box>
                        );
                     }
                  })}
               </Box>
               {isTextName && <Text truncate>{stateChat.chatGroupName}</Text>}
            </>
         ) : (
            <>
               <Box sx={{ flexShrink: 0, width: width, height: height }}>
                  <Avatar
                     style={{ width: `100%`, height: `100%`, borderRadius: `50%`, minWidth: `unset` }}
                     fullName={memberRecipient()?.fullName}
                     avatar={memberRecipient()?.avatar}
                  />
               </Box>
               {isTextName && <Text truncate>{memberRecipient()?.fullName}</Text>}
            </>
         )}
      </Group>
   );
}
