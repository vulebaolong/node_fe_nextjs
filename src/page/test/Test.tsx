import SwitchLanguage from "@/components/test/SwitchLanguage";
import ToggleTheme from "@/components/test/ToggleTheme";
import Zustand from "@/components/test/zustand/Zustand";
import { Stack, Text } from "@mantine/core";
import classes from "./Test.module.css";
import TextToSpeak from "@/components/test/text-to-speak/TextToSpeak";

export default function Test() {
   return (
      <Stack py={100}>
         <TextToSpeak />
         <SwitchLanguage />
         <Zustand />
         <Text className={`${classes[`box-1`]}`}>123</Text>
         <ToggleTheme />
      </Stack>
   );
}
