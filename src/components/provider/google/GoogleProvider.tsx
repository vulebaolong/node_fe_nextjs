import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
   return <GoogleOAuthProvider clientId="802268777340-ja4fgks0rvv3qd86cd9ui4odtrk46mv1.apps.googleusercontent.com">{children}</GoogleOAuthProvider>;
}
