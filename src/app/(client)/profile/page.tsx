import RootPage from "@/components/root-page/RootPage";
import { Profile } from "@/page/profile/Profile";

export default function page() {
   return (
      <RootPage protect>
         <Profile />
      </RootPage>
   );
}
