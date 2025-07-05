import { colors } from "@/components/provider/mantine/theme";
import { COLOR_KEYS } from "@/constant/app.constant";

export const getColorTheme = (): keyof typeof colors => {
    try {
        const stored = localStorage.getItem(COLOR_KEYS);
        if (stored && stored in colors) {
            return stored as keyof typeof colors;
        } else {
            return "Aurora";
        }
    } catch {
        return "Aurora";
    }
};
