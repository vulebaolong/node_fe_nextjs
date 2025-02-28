import { TMessageItem } from "@/types/chat.type";
import { Box } from "@mantine/core";
import classes from "./Recipient.module.css";
import RecipientMessageItem from "./recipient-message-item/RecipientMessageItem";

type TProps = {
   isLast: boolean;
   refToShowButtonScroll: (element: any) => void;
   messageItem: TMessageItem;
};

export default function Recipient({ isLast, refToShowButtonScroll, messageItem }: TProps) {
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
