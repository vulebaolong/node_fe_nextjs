import RootPage from "@/components/root-page/RootPage";
import LoginCallback from "@/page/auth/login/login-callback/LoginCallback";

export default async function page() {
    return (
        <RootPage>
            <LoginCallback />
        </RootPage>
    );
}
