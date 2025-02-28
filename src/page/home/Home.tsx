import { TResPagination } from "@/types/app.type";
import { TArticle } from "@/types/article.type";
import { Box } from "@mantine/core";
import classes from "./Home.module.css";
import HomeCenter from "./home-center/HomeCenter";
import HomeLeft from "./home-left/HomeLeft";
import HomeRight from "./home-right/HomeRight";

type TProps = {
   articles: TResPagination<TArticle[]>[`data`];
};

export default function Home({ articles }: TProps) {
   return (
      <Box className={`${classes[`box-container`]}`} p={20}>
         <Box className={`${classes[`box-item`]}`}>
            <HomeLeft />
         </Box>

         <Box className={`${classes[`box-center`]}`}>
            <HomeCenter articles={articles} />
         </Box>

         <Box className={`${classes[`box-item`]}`}>
            <HomeRight />
         </Box>
      </Box>
   );
}
