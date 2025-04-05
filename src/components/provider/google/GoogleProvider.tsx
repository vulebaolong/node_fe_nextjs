import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
   return <GoogleOAuthProvider clientId="122052377011-4na5iheab4cdpgtc2ebeqet0rhnai35u.apps.googleusercontent.com">{children}</GoogleOAuthProvider>;
}
