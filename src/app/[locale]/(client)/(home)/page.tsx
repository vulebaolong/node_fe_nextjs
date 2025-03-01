import RootPage from "@/components/root-page/RootPage";
import Home from "@/page/home/Home";

export default async function page() {
   return (
      <RootPage protect>
         <Home />
      </RootPage>
   );
}
