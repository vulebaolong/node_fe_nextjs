import { useSocket } from "@/hooks/socket.hook";
import { Box, Group, Image } from "@mantine/core";

export default function Stream() {
   const { isConnected } = useSocket();

   return (
      <Box>
         {isConnected ? (
            <Group>
               {/* <Image src="http://localhost:8000/video" alt="Live Stream" style={{ width: "100%", maxHeight: "500px" }} /> */}
            </Group>
         ) : (
            <Box>⏳ Đang kết nối đến máy chủ...</Box>
         )}
      </Box>
   );
}
