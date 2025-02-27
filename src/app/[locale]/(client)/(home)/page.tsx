import { getListArticleAction } from "@/actions/article.action";
import RootPage from "@/components/root-page/RootPage";
import Home from "@/page/home/Home";

export default async function page() {
   const articles = await getListArticleAction();
   return (
      <RootPage protect>
         <Home articles={articles} />
      </RootPage>
   );
}
