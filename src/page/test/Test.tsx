import StreamHls from "@/components/test/stream-hls/StreamHls";
import ToggleTheme from "@/components/test/ToggleTheme";
import { Stack } from "@mantine/core";

export default function Test() {
   return (
      <Stack py={100}>
         {/* <GetDemo /> */}
         <StreamHls />
         {/* <TextToSpeak />
         <SwitchLanguage />
         <Zustand />
         <Text className={`${classes[`box-1`]}`}>123</Text> */}
         <ToggleTheme />
      </Stack>
   );
}
