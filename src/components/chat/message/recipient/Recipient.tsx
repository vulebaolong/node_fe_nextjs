import { TMessageItem } from "@/types/chat.type";
import { Box } from "@mantine/core";
import classes from "./Recipient.module.css";
import RecipientMessageItem from "./recipient-message-item/RecipientMessageItem";
import { Ref } from "react";

type TProps = {
   isLast?: boolean;
   refToShowButtonScroll?: Ref<HTMLDivElement> | undefined;
   messageItem: TMessageItem;
};

export default function Recipient({ isLast = false, refToShowButtonScroll, messageItem }: TProps) {
   return (
      <>
         {isLast ? (
            <Box style={{ position: `relative` }}>
               <Box ref={refToShowButtonScroll} className={classes[`place-hoder-visible-button-scroll`]} />
               <RecipientMessageItem messageItem={messageItem} />
            </Box>
         ) : (
            <RecipientMessageItem messageItem={messageItem} />
         )}
      </>
   );
}
