import { useRootStore } from "@/components/provider/stores/RootStoreProvider";
import { Box, Button, Center } from "@mantine/core";

function UserZustand() {
   console.log(`render UserZustand`);

   const name = useRootStore().user((state) => state.name);
   const setName = useRootStore().user((state) => state.setName);

   return (
      <Center>
         <Box>
            <h2>👤 User: {name}</h2>
            <Button onClick={() => setName(`${Math.floor(Math.random() * 10)}`)}>Change Name</Button>
         </Box>
      </Center>
   );
}

export default UserZustand;
