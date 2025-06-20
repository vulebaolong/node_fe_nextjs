"use client";

import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

type AppImageProps = {
   alt?: string;
   priority?: boolean;
   style?: CSSProperties;
   objectFit?: CSSProperties["objectFit"];
} & Omit<ImageProps, "fill" | "width" | "height">;

export default function ImageCustom({ alt = "", priority = false, style = {}, objectFit = "cover", ...props }: AppImageProps) {
   return (
      <Image
         {...props}
         alt={alt}
         width={0}
         height={0}
         sizes="100vw"
         priority={priority}
         style={{ width: "100%", height: "100%", objectFit: objectFit, display: "block", ...style }}
      />
   );
}
