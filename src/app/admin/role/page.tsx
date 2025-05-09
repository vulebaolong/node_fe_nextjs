import RootPage from "@/components/root-page/RootPage";
import Role from "@/page/admin/role/Role";

export default async function page() {
   return (
      <RootPage protect>
         <Role />
      </RootPage>
   );
}
