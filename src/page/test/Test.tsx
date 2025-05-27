import GetDemo from "@/components/test/get-demo/GetDemo";
import RainbowKit from "@/components/test/rainbowkit/RainbowKit";
import ToggleTheme from "@/components/test/ToggleTheme";
import { Stack } from "@mantine/core";

export default function Test() {
   return (
      <Stack py={100}>
         <RainbowKit />
         {/* <GetDemo /> */}
         {/* <TextToSpeak />
         <SwitchLanguage />
         <Zustand />
         <Text className={`${classes[`box-1`]}`}>123</Text> */}
         <ToggleTheme />
      </Stack>
   );
}
