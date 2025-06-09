"use client";

import useRouter from "@/hooks/use-router-custom";
import CameraPlayer from "./CameraPlayer";

export default function StreamHls() {
   const router = useRouter();
   //   const { cameraId } = router.query;
   const cameraId = "cam1";

   if (!cameraId || typeof cameraId !== "string") return <div>Loading...</div>;

   return (
      <div>
         <h1>Xem camera: {cameraId}</h1>
         <CameraPlayer cameraId={"cam1"} />
         <CameraPlayer cameraId={"cam2"} />
      </div>
   );
}
