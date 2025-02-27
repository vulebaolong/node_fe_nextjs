import { EReactionArticle } from "@/types/enum/reaction.enum";
import { Box, Transition } from "@mantine/core";
import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";

type TProps = {
   reactionType: number;
};

export default function IconReaction({ reactionType }: TProps) {
   return (
      <Box w={15} h={15}>
         <Transition
            enterDelay={400}
            mounted={reactionType === EReactionArticle[`None`]}
            transition="slide-left"
            duration={400}
            timingFunction="ease"
         >
            {(styles) => (
               <div style={styles}>
                  <IconThumbUp size={14} />
               </div>
            )}
         </Transition>

         <Transition
            enterDelay={400}
            mounted={reactionType === EReactionArticle[`Like`]}
            transition="slide-left"
            duration={400}
            timingFunction="ease"
         >
            {(styles) => (
               <div style={styles}>
                  <IconThumbUpFilled style={{ color: `var(--mantine-color-indigo-light-color)` }} size={14} />
               </div>
            )}
         </Transition>
      </Box>
   );
}
