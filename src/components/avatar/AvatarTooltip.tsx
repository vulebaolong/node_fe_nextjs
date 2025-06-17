import { Text, Tooltip } from "@mantine/core";
import Avatar from "./Avatar";

type TProps = {
   fullName?: string;
   avatar?: string;
};

export default function AvatarTooltip({ fullName, avatar, ...props }: TProps) {
   return (
      <Tooltip
         label={
            <Text truncate maw={100}>
               {fullName}
            </Text>
         }
         position="left"
      >
         <Avatar fullName={fullName} avatar={avatar} />
      </Tooltip>
   );
}
