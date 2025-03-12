import SwitchLanguage from "@/components/test/SwitchLanguage";
import ToggleTheme from "@/components/test/ToggleTheme";
import Zustand from "@/components/test/zustand/Zustand";
import { Stack, Text } from "@mantine/core";
import classes from "./Test.module.css";

export default function Test() {
   return (
      <Stack py={100}>
         <SwitchLanguage />
         <Zustand />
         <Text className={`${classes[`box-1`]}`}>123</Text>
         <ToggleTheme />
      </Stack>
   );
}
