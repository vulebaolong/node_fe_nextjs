import RootPage from "@/components/root-page/RootPage";
import RoleDetail from "@/page/role/role-detail/RoleDetail";

export default function page() {
   return (
      <RootPage protect>
         <RoleDetail />
      </RootPage>
   );
}
