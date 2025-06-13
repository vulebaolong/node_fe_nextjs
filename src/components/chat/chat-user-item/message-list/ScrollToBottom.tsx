import { ActionIcon } from "@mantine/core";
import { IconArrowNarrowDown } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

type TProps = {
   onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
   isAtBottom: boolean;
};

export default function ScrollToBottom({ onClick, isAtBottom }: TProps) {
   return (
      <ActionIcon
         onClick={onClick}
         size={`input-md`}
         variant="default"
         radius="xl"
         style={{
            cursor: "pointer",
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: `translate(-50%, ${isAtBottom ? "100px" : "0"})`,
            opacity: isAtBottom ? 0 : 1,
            pointerEvents: isAtBottom ? "none" : "auto",
            transition: "all 300ms ease",
            zIndex: 1,
            boxShadow: `rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.1) 0px 8px 20px 0px`,
         }}
      >
         <IconArrowNarrowDown color="var(--mantine-color-blue-filled)" style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
   );
}
