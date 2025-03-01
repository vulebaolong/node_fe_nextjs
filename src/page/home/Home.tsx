import { Box } from "@mantine/core";
import classes from "./Home.module.css";
import HomeCenter from "./home-center/HomeCenter";
import HomeLeft from "./home-left/HomeLeft";
import HomeRight from "./home-right/HomeRight";

export default function Home() {
   return (
      <Box className={`${classes[`box-container`]}`} p={20}>
         <Box className={`${classes[`box-item`]}`}>
            <HomeLeft />
         </Box>

         <Box className={`${classes[`box-center`]}`}>
            <HomeCenter />
         </Box>

         <Box className={`${classes[`box-item`]}`}>
            <HomeRight />
         </Box>
      </Box>
   );
}
