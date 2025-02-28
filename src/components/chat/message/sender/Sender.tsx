import { Box } from "@mantine/core";
import classes from "./Sender.module.css";
import SenderMessageItem from "./sender-message-item/SenderMessageItem";
import { TMessageItem } from "@/types/chat.type";

type TProps = {
   messageItem: TMessageItem;
   isLast: boolean;
   refToShowButtonScroll: (element: any) => void;
};

export default function Sender({ messageItem, isLast, refToShowButtonScroll }: TProps) {
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
