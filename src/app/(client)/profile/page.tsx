import RootPage from "@/components/root-page/RootPage";
import { Profile } from "@/page123/profile/Profile";

export default function page() {
   return (
      <RootPage protect>
         <Profile />
      </RootPage>
   );
}
