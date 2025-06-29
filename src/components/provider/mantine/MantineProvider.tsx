import { RootStyleRegistry } from "@/components/provider/mantine/EmotionRootStyleRegistry";
import { useAppSelector } from "@/redux/hooks";
import { MantineProvider as MantineProviderRoot } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { ReactNode } from "react";
import { getTheme, resolver } from "./theme";

export default function MantineProvider({ children }: { children: ReactNode }) {
   const selectedColorTheme = useAppSelector((state) => state.setting.selectedColorTheme);
   return (
      <RootStyleRegistry>
         <MantineEmotionProvider>
            <MantineProviderRoot
               theme={getTheme({ primaryColor: selectedColorTheme })}
               stylesTransform={emotionTransform}
               defaultColorScheme="light"
               cssVariablesResolver={resolver}
            >
               {children}
            </MantineProviderRoot>
         </MantineEmotionProvider>
      </RootStyleRegistry>
   );
}
