"use client";

import { useRootStore } from "@/components/provider/stores/RootStoreProvider";
import { Box, Button, Center } from "@mantine/core";

function CountZustand() {
   console.log(`render CountZustand`);
   const count = useRootStore().counter((state) => state.count);
   const decrement = useRootStore().counter((state) => state.decrement);
   const increment = useRootStore().counter((state) => state.increment);
   return (
      <Center>
         <Box>
            <h2>🐻 Counter: {count}</h2>
            <Button onClick={increment}>Increase</Button>
            <Button onClick={decrement}>Decrease</Button>
         </Box>
      </Center>
   );
}

export default CountZustand;
