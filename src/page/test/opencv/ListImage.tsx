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
            console.log({ data });
            setListImagePath((prev) => [...prev, data.image_path]);
         });
      }
   }, [socket]);

   console.log({ listImagePath });
   return (
      <div>
         <Stack>
            {listImagePath.map((item, i) => {
               return <Image key={i} src={`http://localhost:8000/${item}`} alt="Live Stream" style={{ width: "100%", maxHeight: "500px" }} />;
            })}
         </Stack>
      </div>
   );
}
