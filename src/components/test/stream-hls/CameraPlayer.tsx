// components/CameraPlayer.tsx
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { NEXT_PUBLIC_BASE_DOMAIN_API } from "@/constant/app.constant";

type Props = {
   cameraId: string;
};

function CameraPlayer({ cameraId }: Props) {
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      if (Hls.isSupported() && videoRef.current) {
         const hls = new Hls();
         hls.loadSource(`${NEXT_PUBLIC_BASE_DOMAIN_API}stream/${cameraId}/index.m3u8`);
         hls.attachMedia(videoRef.current);
         hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current?.play();
         });

         return () => {
            hls.destroy();
         };
      } else if (videoRef.current) {
         // Safari or native HLS support
         videoRef.current.src = `${NEXT_PUBLIC_BASE_DOMAIN_API}stream/${cameraId}/index.m3u8`;
      }
   }, [cameraId]);

   return <video ref={videoRef} controls width="640" height="480" muted />;
}

export default CameraPlayer;
