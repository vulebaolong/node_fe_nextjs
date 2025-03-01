import RootPage from "@/components/root-page/RootPage";
import Role from "@/page/role/Role";

export default function page() {
   return (
      <RootPage protect>
         <Role />
      </RootPage>
   );
}
