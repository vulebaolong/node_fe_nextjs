import { checkPathImage } from "@/helpers/function.helper";
import { TUser } from "@/types/user.type";
import { Avatar as AvatarMantine, AvatarProps, Box } from "@mantine/core";
import Image from "next/image";
import { forwardRef } from "react";

type TProps = {
   user?: TUser | null;
} & AvatarProps;

const Avatar = forwardRef<HTMLDivElement, TProps & React.ComponentPropsWithoutRef<"div">>(({ user, style, ...props }, ref) => {
   return (
      <Box pos={`relative`} w={`min-content`}>
         <AvatarMantine
            style={{ ...style }}
            {...props}
            ref={ref}
            alt="avatar"
            src={checkPathImage(user?.avatar)}
            color={`initials`}
            name={!user?.avatar ? (user?.fullName as string | undefined) : `??`}
            variant="filled"
         />
         {user?.roleId === 1 && (
            <Box
               style={{
                  top: 0,
                  right: 0,
                  width: `50%`,
                  position: `absolute`,
                  height: `50%`,
                  transform: `translate(50%, -50%)`,
                  rotate: `20deg`,
                  transformOrigin: `top right`,
               }}
            >
               <Image
                  alt=""
                  src="/images/user/admin.webp"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: `700px` }}
               />
            </Box>
         )}
      </Box>
   );
});

Avatar.displayName = 'Avatar';

export default Avatar;
