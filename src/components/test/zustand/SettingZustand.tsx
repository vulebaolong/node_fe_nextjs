import { useRootStore } from "@/components/provider/stores/RootStoreProvider";
import { Box, Button, Center } from "@mantine/core";

function SettingZustand() {
   console.log(`render SettingZustand`);

   const theme = useRootStore().settings((state) => state.theme);
   const toggleTheme = useRootStore().settings((state) => state.toggleTheme);

   return (
      <Center>
         <Box>
            <h2>🎨 Theme: {theme}</h2>
            <Button onClick={toggleTheme}>Toggle Theme</Button>
         </Box>
      </Center>
   );
}

export default SettingZustand;
