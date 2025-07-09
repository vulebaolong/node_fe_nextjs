import { Switch, SwitchProps } from "@mantine/core";
import { useEffect, useState } from "react";

type SwitchCustomProps = {
   initialChecked?: boolean;
   onToggle: (nextValue: boolean) => Promise<any>;
} & Omit<SwitchProps, "checked" | "onChange" | "value">;

export const SwitchCustom = ({ initialChecked = false, onToggle, ...rest }: SwitchCustomProps) => {
   const [checked, setChecked] = useState<boolean>(initialChecked);
   // const [isPending, setIsPending] = useState(false);

   useEffect(() => {
      setChecked(initialChecked);
   }, [initialChecked]);

   const handleClick = async () => {
      const next = !checked;
      setChecked(next);
      // setIsPending(true);

      try {
         await onToggle(next);
      } catch (err) {
         setChecked(!next);
         console.error("Failed to update switch:", err);
      } finally {
         // setIsPending(false);
      }
   };

   // return <Switch checked={checked} onClick={handleClick} disabled={disabled || isPending} {...rest} />;
   return <Switch checked={checked} onClick={handleClick} {...rest} />;
};
