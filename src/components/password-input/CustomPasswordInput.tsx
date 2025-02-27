'use client'

import { Group, PasswordInput, PasswordInputProps, Popover, Progress, Text } from "@mantine/core";
import { IconCheck, IconEyeCheck, IconEyeOff, IconX } from "@tabler/icons-react";
import { DOMAttributes, useEffect, useState } from "react";

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
   return (
      <Group c={meets ? "teal" : "red"} wrap="nowrap" gap={2}>
         {meets ? <IconCheck size={15} /> : <IconX size={15} />}
         <Text c={`inherit`} fz={14}>
            {label}
         </Text>
      </Group>
   );
}

export const validatePassword = [
   { re: /[0-9]/, label: "Includes number." },
   { re: /[a-z]/, label: "Includes lowercase letter." },
   { re: /[A-Z]/, label: "Includes uppercase letter." },
   { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol." },
   { re: /^.{6,}$/, label: "Includes at least 6 characters." },
];

function getStrength(password: string) {
   let multiplier = password.length > 5 ? 0 : 1;

   validatePassword.forEach((requirement) => {
      if (!requirement.re.test(password)) {
         multiplier += 1;
      }
   });

   return Math.max(100 - (100 / (validatePassword.length + 1)) * multiplier, 10);
}

type TProps = {
   value: string;
} & PasswordInputProps &
   DOMAttributes<any>;

let timeOut: NodeJS.Timeout | null = null;
const CustomPasswordInput = (props: TProps) => {
   const [popoverOpened, setPopoverOpened] = useState(false);

   const strength = getStrength(props.value as string || ``);
   const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

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
                  {...props}
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
            {validatePassword.map((requirement, index) => (
               <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(props?.value)} />
            ))}
         </Popover.Dropdown>
      </Popover>
   );
};

export default CustomPasswordInput;
