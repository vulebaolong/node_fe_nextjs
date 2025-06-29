"use client";

import { COLOR_KEYS } from "@/constant/app.constant";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SET_SELECTED_COLOR_THEME } from "@/redux/slices/setting.slice";
import { Box, Group, Select } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { colors } from "../provider/mantine/theme";
import { getColorTheme } from "@/helpers/color-theme.helper";

export default function ColorThemeSelector() {
   const selectedColorTheme = useAppSelector((state) => state.setting.selectedColorTheme);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const color = getColorTheme();
      dispatch(SET_SELECTED_COLOR_THEME(color));
   }, []);

   const handleChange = (value: string | null) => {
      if (!value) return;
      dispatch(SET_SELECTED_COLOR_THEME(value as keyof typeof colors));
      localStorage.setItem(COLOR_KEYS, value);
   };

   return (
      <Select
         radius="lg"
         data={Object.entries(colors).map(([key]) => {
            return key;
         })}
         renderOption={({ option, checked }) => {
            return (
               <Group flex="1" gap="xs">
                  <Group
                     gap={1}
                     sx={{
                        borderRadius: `5px`,
                        overflow: `hidden`,
                     }}
                  >
                     {colors[option.value as keyof typeof colors].map((color, i) => {
                        return (
                           <Box
                              key={i}
                              style={{
                                 width: "10px",
                                 height: "20px",
                                 backgroundColor: color,
                              }}
                           />
                        );
                     })}
                  </Group>
                  {checked && <IconCheck style={{ marginInlineStart: "auto" }} />}
               </Group>
            );
         }}
         value={selectedColorTheme}
         onChange={handleChange}
      />
   );
}
