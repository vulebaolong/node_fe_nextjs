import RootPage from "@/components/root-page/RootPage";
import Setting from "@/page/setting/Setting";

export default function page() {
   return (
      <RootPage protect>
         <Setting />
      </RootPage>
   );
}
