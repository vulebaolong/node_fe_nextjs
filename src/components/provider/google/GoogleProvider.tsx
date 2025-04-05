import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
   return <GoogleOAuthProvider clientId="122052377011-mgmoh0trbj2vbkgpodumajnu11vu8o2q.apps.googleusercontent.com">{children}</GoogleOAuthProvider>;
}
