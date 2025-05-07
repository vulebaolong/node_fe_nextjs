import { NEXT_PUBLIC_BASE_DOMAIN_API } from "@/constant/app.constant";
import { useSocket } from "@/hooks/socket.hook";
import { Box, Group, Image } from "@mantine/core";

export default function Stream() {
   const { isConnected } = useSocket();

   return (
      <Box>
         {isConnected ? (
            <Group>
               <Image src={`${NEXT_PUBLIC_BASE_DOMAIN_API}stream`} alt="Live Stream" style={{ width: "100%", maxHeight: "500px" }} />
            </Group>
         ) : (
            <Box>⏳ Đang kết nối đến máy chủ...</Box>
         )}
      </Box>
   );
}
