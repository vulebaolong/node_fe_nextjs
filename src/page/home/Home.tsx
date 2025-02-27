import Article from "@/components/article/Article";
import { TResPagination } from "@/types/app.type";
import { TArticle } from "@/types/article.type";
import { Box, Stack } from "@mantine/core";
import classes from "./Home.module.css";
import HomeRight from "./home-right/HomeRight";
import HomeCenter from "./home-center/HomeCenter";
import HomeLeft from "./home-left/HomeLeft";

type TProps = {
   articles: TResPagination<TArticle[]>[`data`];
};

export default function Home({ articles }: TProps) {
   console.log({ articles });
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
