import Login from "@/page/auth/login/Login";
import RootPage from "@/components/root-page/RootPage";

export default async function page() {
   return (
      <RootPage>
         <Login />
      </RootPage>
   );
}
