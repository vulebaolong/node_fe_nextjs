import { Center } from "@mantine/core";
import Nodata from "./Nodata";

type TProps = {
   visiable: boolean;
   width?: number;
   height?: number;
};

export default function NodataOverlay({ visiable, width, height }: TProps) {
   if (!visiable) return <></>;

   return (
      <Center component="span" pos={`absolute`} style={{ width: `100%`, height: `100%`, top: 0, left: 0 }}>
         <Nodata width={width} height={height} />
      </Center>
   );
}
