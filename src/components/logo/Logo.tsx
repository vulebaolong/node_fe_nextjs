import { LOGO } from "@/constant/app.constant";
import useRouter from "@/hooks/use-router-custom";
import { Box } from "@mantine/core";
import Image from "next/image";

type TProps = {
    width?: number | string;
    height?: number | string;
    aspectRatio?: string;
    src?: string;
};

export function Logo({ width = 40, height = `auto`, src = LOGO, aspectRatio = "1 / 1" }: TProps) {
    const router = useRouter();

    const handleClickLogo = () => {
        router.push("/");
    };

    return (
        <Box onClick={handleClickLogo} style={{ aspectRatio: aspectRatio, width, height, cursor: `pointer` }}>
            <Image
                src={src}
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
