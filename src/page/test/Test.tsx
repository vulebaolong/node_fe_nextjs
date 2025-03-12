import SwitchLanguage from "@/components/test/SwitchLanguage";
import ToggleTheme from "@/components/test/ToggleTheme";
import { Box, Text } from "@mantine/core";
import classes from "./Test.module.css";
import Zustand from "@/components/test/zustand/Zustand";

export default function Test() {
   return (
      <Box>
         <Zustand />
         <Text className={`${classes[`box-1`]}`}>123</Text>
         <SwitchLanguage />
         <ToggleTheme />
      </Box>
   );
}
