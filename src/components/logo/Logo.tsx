import { LOGO } from "@/constant/app.constant";
import { Box } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TProps = {
   width?: number | string;
   height?: number | string;
};

export function Logo({ width = 40, height = `auto` }: TProps) {
   const router = useRouter();

   const handleClickLogo = () => {
      router.push("/");
   };

   return (
      <Box onClick={handleClickLogo} style={{ aspectRatio: "1 / 1", width, height, cursor: `pointer` }}>
         <Image
            src={LOGO}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            alt="product-image"
            priority={true}
         />
      </Box>
   );
}
