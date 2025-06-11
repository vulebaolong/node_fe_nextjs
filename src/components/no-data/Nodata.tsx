import { Stack, Text } from "@mantine/core";
import IconEmpty from "./IconEmty";

type TNodata = {
   colorMode?: "dark" | "light";
   width?: number;
   height?: number;
};

export default function Nodata({ colorMode = "dark", width, height }: TNodata) {
   const isDark = colorMode === "dark";
   const textColor = isDark ? "var(--mantine-color-dark-2)" : "var(--mantine-color-gray-2)";

   return (
      <Stack align="center" gap={2}>
         <IconEmpty colorMode={colorMode} width={width} height={height} />
         <Text style={{ textAlign: "center", color: textColor }}>No data</Text>
      </Stack>
   );
}
