import RootPage from "@/components/root-page/RootPage";
import UserDetail from "@/page/user/user-detail/UserDetail";

export default function page() {
   return (
      <RootPage protect>
         <UserDetail />
      </RootPage>
   );
}
