import { Box, LoadingOverlay } from "@mantine/core";
import ImageCustom from "../custom/image-custom/ImageCustom";
import { Paper } from "@mantine/core";

type TProps = {
   qr: string;
   isPending: boolean;
   srcImageCenter: string;
   paddingImageCenter?: string | number;
   width?: string;
   height?: string;
   paddingPaper?: string;
};

export default function QRImage({ qr, isPending, srcImageCenter, width = `300px`, height = `300px`, paddingPaper, paddingImageCenter }: TProps) {
   return (
      <Paper shadow="sm" radius={`10%`} withBorder p={paddingPaper} w={`min-content`}>
         <Box style={{ width: width, height: height, borderRadius: `20px`, overflow: `hidden`, position: `relative` }}>
            <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: "sm", bg: `transparent` }} />
            {qr && (
               <Box style={{ width: `100%`, height: `100%`, position: `relative` }}>
                  <Box
                     style={{
                        position: `absolute`,
                        top: `50%`,
                        left: `50%`,
                        width: `20%`,
                        height: `20%`,
                        zIndex: 1,
                        transform: `translate(-50%, -50%)`,
                        borderRadius: `50%`,
                        backgroundColor: `#fff`,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        padding: paddingImageCenter,
                     }}
                  >
                     <ImageCustom src={srcImageCenter} alt="qr-image" />
                  </Box>
                  <ImageCustom src={qr} alt="qr-image" />
               </Box>
            )}
         </Box>
      </Paper>
   );
}
