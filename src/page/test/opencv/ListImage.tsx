import { NEXT_PUBLIC_BASE_DOMAIN_API } from "@/constant/app.constant";
import { listenToEvent } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { Image, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ListImage() {
   const [listImagePath, setListImagePath] = useState<string[]>([]);
    const { socket } = useSocket();

  useEffect(() => {
      if (socket) {
         listenToEvent(socket, `plate_saved`, (data) => {
            console.log(`plate_saved`,{ data });
            setListImagePath((prev) => [...prev, data.image_path]);
         });
      }
   }, [socket]);

   return (
      <div>
         <Stack>
            {listImagePath.map((item, i) => {
               return <Image key={i} src={`${NEXT_PUBLIC_BASE_DOMAIN_API}${item}`} alt="Live Stream" style={{ width: "100%", maxHeight: "500px" }} />;
            })}
         </Stack>
      </div>
   );
}
