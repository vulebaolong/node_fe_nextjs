import RootPage from "@/components/root-page/RootPage";
import RoleDetail from "@/page123/role/role-detail/RoleDetail";

export default function page() {
   return (
      <RootPage protect>
         <RoleDetail />
      </RootPage>
   );
}
