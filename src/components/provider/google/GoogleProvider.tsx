import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
   return <GoogleOAuthProvider clientId="51741480462-sju2g6kifis2hm9h3qpl147jh7enu6ie.apps.googleusercontent.com">{children}</GoogleOAuthProvider>;
}
