import { checkPathImage } from "@/helpers/function.helper";
import { Avatar as AvatarMantine, AvatarProps, Text, Tooltip } from "@mantine/core";
import { forwardRef } from "react";

type TProps = {
   fullName?: string;
   avatar?: string;
   roleId?: number;
} & AvatarProps;

const Avatar = forwardRef<HTMLDivElement, TProps & React.ComponentPropsWithoutRef<"div">>(({ fullName, avatar, roleId, ...props }, ref) => {
   return (
      <Tooltip
         label={
            <Text truncate maw={100}>
               {fullName}
            </Text>
         }
         position="left"
      >
         <AvatarMantine
            {...props}
            ref={ref}
            alt="avatar"
            src={checkPathImage(avatar)}
            color={`initials`}
            name={!avatar ? (fullName as string | undefined) : `??`}
            variant="filled"
         >
            {/* {roleId === 1 && (
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
               {iconChevronDown && (
                  <Box
                     style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        borderRadius: "50%",
                        width: "12px",
                        height: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "var(--mantine-color-body)",
                        cursor: "pointer",
                     }}
                  >
                     <IconChevronDown style={{ width: `100%`, height: `100%` }} />
                  </Box>
               )} */}
         </AvatarMantine>
      </Tooltip>
   );
});

Avatar.displayName = "Avatar";

export default Avatar;
