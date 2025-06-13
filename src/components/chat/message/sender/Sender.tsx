import { Box } from "@mantine/core";
import classes from "./Sender.module.css";
import SenderMessageItem from "./sender-message-item/SenderMessageItem";
import { TMessageItem } from "@/types/chat.type";
import { Ref } from "react";

type TProps = {
   messageItem: TMessageItem;
   isLast?: boolean;
   refToShowButtonScroll?: Ref<HTMLDivElement> | undefined;
};

export default function Sender({ messageItem, isLast = false, refToShowButtonScroll }: TProps) {
   return (
      <>
         {isLast ? (
            <Box style={{ position: `relative` }}>
               <Box ref={refToShowButtonScroll} className={classes[`place-hoder-visible-button-scroll`]} />
               <SenderMessageItem messageItem={messageItem} />
            </Box>
         ) : (
            <SenderMessageItem messageItem={messageItem} />
         )}
      </>
   );
}
