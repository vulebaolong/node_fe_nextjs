import { checkPathImage } from "@/helpers/function.helper";
import { Avatar as AvatarMantine, AvatarProps, Text, Tooltip } from "@mantine/core";
import { forwardRef } from "react";

type TProps = {
   fullName?: string;
   avatar?: string;
} & AvatarProps;

const Avatar = forwardRef<HTMLDivElement, TProps & React.ComponentPropsWithoutRef<"div">>(({ fullName, avatar, ...props }, ref) => {
   return (
      <AvatarMantine
         {...props}
         ref={ref}
         alt="avatar"
         src={checkPathImage(avatar)}
         color={`initials`}
         name={!avatar ? (fullName as string | undefined) : `??`}
         variant="filled"
      ></AvatarMantine>
   );
});

Avatar.displayName = "Avatar";

export default Avatar;
