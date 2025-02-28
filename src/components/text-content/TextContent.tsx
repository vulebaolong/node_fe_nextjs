"use client";

import { Box, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

type TProps = {
   text: string;
};

export default function TextContent({ text }: TProps) {
   const [lineClamp, toggleLineClamp] = useToggle([3, 0]);

   return (
      <Box>
         <Text style={{ overflowWrap: `break-word` }} lineClamp={lineClamp}>
            {text}
         </Text>
         {(text?.length || 0) > 80 && (
            <>
               {lineClamp === 0 ? (
                  <Text
                     onClick={() => {
                        toggleLineClamp();
                     }}
                     span
                     fw={700}
                     style={{ cursor: `pointer` }}
                  >
                     Ẩn bớt
                  </Text>
               ) : (
                  <Text
                     onClick={() => {
                        toggleLineClamp();
                     }}
                     span
                     fw={700}
                     style={{ cursor: `pointer` }}
                  >
                     Xem Thêm
                  </Text>
               )}
            </>
         )}
      </Box>
   );
}
