import { hexToRgba } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

type TProps = {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    background?: CSSProperties["background"];
    borderRadius?: CSSProperties["borderRadius"];
    glowWidth?: CSSProperties["width"];
    glowHeight?: CSSProperties["height"];
    overflow?: CSSProperties["overflow"];
    backgroundGlowAnimate1?: string;
    backgroundGlowAnimate2?: string;
    blurAmount?: number;
    children?: React.ReactNode;
    persistGlow?: boolean;
    onHover?: boolean;
};

type TShouldShowGlow = {
    isInside: boolean; // true nếu chuột đang ở trong vùng component
    onHover?: boolean; // tùy chọn: glow chỉ hiện khi hover
    persistGlow?: boolean; // tùy chọn: glow luôn hiển thị, kể cả khi không hover
};

export default function GlowCard({
    width = 300,
    height = 300,
    glowWidth = 160,
    glowHeight = 160,
    blurAmount = 40,
    persistGlow = false,
    background = "transparent",
    borderRadius = "1rem",
    overflow = "hidden",
    onHover,
    children,
}: TProps) {
    const [bg1, setBg1] = useState("rgba(173, 89, 251, 0.1)");
    const [bg2, setBg2] = useState("rgba(167, 189, 255, 0.2)");
    const selectedColorTheme = useAppSelector((state) => state.setting.selectedColorTheme);

    useEffect(() => {
        const style = getComputedStyle(document.documentElement);

        const primaryColor = style.getPropertyValue("--mantine-primary-color-8").trim();
        const secondaryColor = style.getPropertyValue("--mantine-primary-color-2").trim(); // hoặc custom var bạn tạo

        setBg1(`${hexToRgba(primaryColor, 0.1)}`);
        setBg2(`${hexToRgba(secondaryColor, 0.2)}`);
    }, [selectedColorTheme]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [isInside, setIsInside] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, { stiffness: 150, damping: 20 });
    const smoothY = useSpring(y, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);
        }
    };

    const shouldShowGlow = ({ isInside, onHover, persistGlow }: TShouldShowGlow): boolean => {
        // 1. Nếu persistGlow được bật (true) → luôn hiển thị glow
        if (persistGlow) return true;

        // 2. Nếu onHover không được truyền (undefined) → sử dụng mặc định là chỉ hiển thị khi chuột ở trong
        if (onHover === undefined) return isInside;

        // 3. Nếu onHover được truyền rõ ràng:
        //    - true  → hiển thị glow nếu chuột đang ở trong
        //    - false → không bao giờ hiển thị glow
        return onHover && isInside;
    };

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsInside(true)}
            onMouseLeave={() => setIsInside(false)}
            onMouseMove={handleMouseMove}
            style={{
                position: "relative",
                width,
                height,
                borderRadius,
                overflow, // Cho phép glow lem ra ngoài
                background,
            }}
        >
            {/* Neon Glow Layer */}
            <AnimatePresence>
                {shouldShowGlow({ isInside, onHover, persistGlow }) && (
                    <motion.div
                        key="glow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                            zIndex: 0,
                        }}
                    >
                        <motion.div
                            animate={{
                                background: [
                                    `radial-gradient(circle, ${bg1} 0%, ${bg2} 50%, transparent 80%)`,
                                    `radial-gradient(circle, ${bg2} 0%, ${bg1} 50%, transparent 80%)`,
                                ],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                            style={{
                                width: glowWidth,
                                height: glowHeight,
                                borderRadius: "50%",
                                position: "absolute",
                                top: smoothY,
                                left: smoothX,
                                transform: "translate(-50%, -50%)",
                                filter: `blur(${blurAmount}px)`,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Card Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    background,
                    borderRadius,
                    height: "100%",
                    width: "100%",
                }}
            >
                {children}
            </div>
        </div>
    );
}
