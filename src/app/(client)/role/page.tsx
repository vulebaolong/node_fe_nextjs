import RootPage from "@/components/root-page/RootPage";
import Role from "@/page123/role/Role";

export default function page() {
   return (
      <RootPage protect>
         <Role />
      </RootPage>
   );
}
