import { Stack, Text } from "@mantine/core";
import IconEmpty from "./IconEmty";

type TNodata= {
   colorMode?: "dark" | "light";
};

export default function Nodata({ colorMode = "dark" }: TNodata) {
   const isDark = colorMode === "dark";
   const textColor = isDark ? "var(--mantine-color-dark-2)" : "var(--mantine-color-gray-2)";
 
   return (
     <Stack align="center">
       <IconEmpty colorMode={colorMode} />
       <Text style={{ textAlign: "center", color: textColor }}>No data</Text>
     </Stack>
   );
 }
