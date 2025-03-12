import { Center, Group } from "@mantine/core";
import ButtonToggleTheme from "../toggle-theme/button/ButtonToggleTheme";
import SwitchToggleTheme from "../toggle-theme/switch/SwitchToggleTheme";

function ToggleTheme() {
   console.log(`render ToggleTheme`);
   return (
      <Center>
         <Group>
            <ButtonToggleTheme />
            <SwitchToggleTheme />
         </Group>
      </Center>
   );
}

export default ToggleTheme;
