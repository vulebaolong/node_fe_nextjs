import { Text } from "@mantine/core";
import { motion, MotionStyle } from "framer-motion";

export const textVariants = {
    initial: {
        opacity: 0,
        x: 20,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
};

export const warningVariants = {
    initial: {
        opacity: 0,
        y: -20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.625,
        },
    },
    exit: {
        opacity: 0,
        y: -5,
    },
};

export const buttonVariants = {
    initial: {
        opacity: 0,
        y: -50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.625,
        },
    },
    exit: {
        opacity: 0,
        y: 2,
    },
};

export const sentenceVariant = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 1,
        transition: {
            delayChildren: 0,
            staggerChildren: 0.02,
        },
    },
};

export const letterVariant = {
    initial: {
        opacity: 0,
        y: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
};

export const wrapperVariants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
};

export const connectVariants = {
    initial: {
        opacity: 0,
        x: 10,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: 10,
    },
};

export const accountVariants = {
    initial: {
        y: "-100%",
        opacity: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -1,
    },
};

export const effectText = (text: string, style?: MotionStyle) => {
    return (
        <motion.p variants={sentenceVariant} initial="initial" animate="animate" style={{ margin: `0`, ...style }}>
            {text.split("").map((letter, index) => (
                <motion.span key={`${letter}-${index}`} variants={letterVariant}>
                    {letter}
                </motion.span>
            ))}
        </motion.p>
    );
};

export function typingText(text: string) {
    return (
        <Text px={12} fz="sm" c="dimmed" sx={{ display: "flex", alignItems: "center" }}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    style={{ fontWeight: "bold", display: "inline-block" }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.08 }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </Text>
    );
}

const waveVariants = {
    animate: (i: number) => ({
        y: [0, -6, 0],
        transition: {
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.08,
        },
    }),
};

export function TypingWaveText() {
    const text = "Đang viết";
    return (
        <Text px={12} fz="sm" c="dimmed" sx={{ display: "inline-block" }}>
            {text.split("").map((char, i) => (
                <motion.span key={i} custom={i} animate="animate" variants={waveVariants} style={{ display: "inline-block" }}>
                    {char}
                </motion.span>
            ))}
            <motion.span custom={text.length} animate="animate" variants={waveVariants} style={{ display: "inline-block", marginLeft: 2 }}>
                ...
            </motion.span>
        </Text>
    );
}
