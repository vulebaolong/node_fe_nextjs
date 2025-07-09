import { RootStyleRegistry } from "@/components/provider/mantine/EmotionRootStyleRegistry";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MantineProvider as MantineProviderRoot } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { ReactNode, useEffect, useState } from "react";
import { colors, getTheme, resolver } from "./theme";
import { COLOR_KEYS } from "@/constant/app.constant";
import { SET_SELECTED_COLOR_THEME } from "@/redux/slices/setting.slice";

export default function MantineProvider({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const selectedColorTheme = useAppSelector((state) => state.setting.selectedColorTheme);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Lấy theme từ localStorage khi client mount
        const stored = localStorage.getItem(COLOR_KEYS);
        if (stored && stored in colors) {
            dispatch(SET_SELECTED_COLOR_THEME(stored));
        }
    }, [dispatch]);

    // Chỉ đổi theme khi đã mount, còn SSR dùng theme mặc định (Aurora)
    const theme = getTheme({ primaryColor: isMounted ? selectedColorTheme : "Aurora" });

    return (
        <RootStyleRegistry>
            <MantineEmotionProvider>
                <MantineProviderRoot theme={theme} stylesTransform={emotionTransform} defaultColorScheme="light" cssVariablesResolver={resolver}>
                    {children}
                </MantineProviderRoot>
            </MantineEmotionProvider>
        </RootStyleRegistry>
    );
}
