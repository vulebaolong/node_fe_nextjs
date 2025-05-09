import RootPage from "@/components/root-page/RootPage";
import Dashboard from "@/page/admin/dashboard/Dashboard";

export default async function page() {
   return (
      <RootPage protect>
         <Dashboard />
      </RootPage>
   );
}
