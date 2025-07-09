import { MantineTheme } from "@mantine/core";
import { EmotionHelpers } from "@mantine/emotion";

type TEmotionSxFunction = (theme: MantineTheme, u: EmotionHelpers, extra?: any) => any;

export const background1: TEmotionSxFunction = (_: MantineTheme, u: EmotionHelpers) => {
    return {
        borderRadius: `20px`,
        boxShadow: `0 1px 2px rgba(0, 0, 0, .2)`,
        [u.light]: {
            backgroundColor: `white`,
        },
        [u.dark]: {
            backgroundColor: `var(--mantine-color-dark-6)`,
        },
    };
};
