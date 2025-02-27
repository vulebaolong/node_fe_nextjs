// PasswordInputCustom.js
import { Group, PasswordInput, PasswordInputProps, Popover, Progress, Text } from "@mantine/core";
import { IconCheck, IconEyeCheck, IconEyeOff, IconX } from "@tabler/icons-react";
import { DOMAttributes, useEffect, useState } from "react";
import { validatePassword } from "./CustomPasswordInput";

function RePasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
   return (
      <Group c={meets ? "teal" : "red"} wrap="nowrap" gap={2}>
         {meets ? <IconCheck size={15} /> : <IconX size={15} />}
         <Text c={`inherit`} fz={14}>
            {label}
         </Text>
      </Group>
   );
}

type TProps = {
   password: string;
   rePassword: string;
} & PasswordInputProps &
   DOMAttributes<any>;

let timeOut: NodeJS.Timeout | null = null;
const CustomRePasswordInput = ({ password, rePassword, ...rest }: TProps) => {
   const [popoverOpened, setPopoverOpened] = useState(false);

   const isPasswordValid = validatePassword.every((requirement) => requirement.re.test(password));

   const passwordsMatch = isPasswordValid && password === rePassword;

   const strength = (isPasswordValid ? 50 : 0) + (passwordsMatch ? 50 : 0);

   const color = strength === 100 ? "teal" : strength >= 50 ? "yellow" : "red";

   useEffect(() => {
      if (strength === 100) {
         if (timeOut) {
            clearTimeout(timeOut);
            timeOut = null;
         }
         timeOut = setTimeout(() => {
            setPopoverOpened(false);
            if (timeOut) {
               clearTimeout(timeOut);
               timeOut = null;
            }
         }, 300);
      }

      return () => {
         if (timeOut) {
            clearTimeout(timeOut);
            timeOut = null;
         }
      };
   }, [strength]);

   return (
      <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: "pop" }}>
         <Popover.Target>
            <div onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
               <PasswordInput
                  {...rest}
                  visibilityToggleIcon={({ reveal }) =>
                     reveal ? (
                        <IconEyeCheck style={{ width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" }} />
                     ) : (
                        <IconEyeOff style={{ width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" }} />
                     )
                  }
               />
            </div>
         </Popover.Target>
         <Popover.Dropdown>
            <Progress color={color} value={strength} size={5} mb="xs" />

            <RePasswordRequirement label="Password is valid." meets={isPasswordValid} />
            <RePasswordRequirement label="Passwords match." meets={passwordsMatch} />
         </Popover.Dropdown>
      </Popover>
   );
};

export default CustomRePasswordInput;
