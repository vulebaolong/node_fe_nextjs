import { Group, Text } from "@mantine/core";
import { JSX } from "react";

type TProps = {
   item:
      | {
           label: string;
           icon: JSX.Element;
           href: string;
        }
      | {
           label: string;
           icon: JSX.Element;
           href: null;
        };
   onClick?: () => void;
};

export default function UserMenuItem({ item, onClick }: TProps) {
   return (
      <Group
         onClick={onClick}
         sx={{
            padding: `0px 10px`,
            height: `36px`,
            borderRadius: `10px`,
            "&:hover": { backgroundColor: `var(--mantine-color-gray-light-hover)` },
            cursor: `pointer`,
            transition: `background-color 0.2s ease`,
         }}
      >
         {item.icon}
         <Text sx={{ fontSize: `14px`, fontWeight: 600, opacity: 0.9 }}>{item.label}</Text>
      </Group>
   );
}
