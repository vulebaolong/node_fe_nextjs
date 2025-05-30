import GetDemo from "@/components/test/get-demo/GetDemo";
import ToggleTheme from "@/components/test/ToggleTheme";
import { Stack } from "@mantine/core";

export default function Test() {
   return (
      <Stack py={100}>
         <GetDemo />
         {/* <TextToSpeak />
         <SwitchLanguage />
         <Zustand />
         <Text className={`${classes[`box-1`]}`}>123</Text> */}
         <ToggleTheme />
      </Stack>
   );
}
