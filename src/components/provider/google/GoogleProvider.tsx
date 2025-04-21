import { NEXT_PUBLIC_GOOGLE_CLIENT_ID } from "@/constant/app.constant";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
   return <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>;
}
