"use client";

import { useGetLinkRtc } from "@/tantask/stream-rtc";
import { useState } from "react";

export default function StreamRtc() {
   const [query, setQuery] = useState('cam1')
   const getLinkRtc = useGetLinkRtc(query);

   console.log({ getLinkRtc: getLinkRtc.data });
   return (
      <div>
         StreamRtc
         <iframe src={getLinkRtc?.data?.url} width="640" height="480" />
      </div>
   );
}
