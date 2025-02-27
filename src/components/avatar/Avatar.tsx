import { Avatar as AvatarMantine, AvatarProps } from "@mantine/core";
import { forwardRef } from "react";
import { TUser } from "@/types/user.type";
import { checkPathImage } from "@/helpers/function.helper";

type TProps = {
   user?: TUser | null;
} & AvatarProps;

export const Avatar = forwardRef<HTMLDivElement, TProps & React.ComponentPropsWithoutRef<"div">>(({ user, style, ...props }, ref) => {
   return (
      <AvatarMantine
         style={{ outline: user?.Roles.id === 1 ? `2px solid var(--mantine-color-red-filled)` : `unset`, ...style }}
         {...props}
         ref={ref}
         alt="avatar"
         src={checkPathImage(user?.avatar)}
         color={`initials`}
         name={!user?.avatar ? (user?.fullName as string | undefined) : undefined}
      />
   );
});
