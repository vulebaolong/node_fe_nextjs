import RootPage from "@/components/root-page/RootPage";
import Permission from "@/page/admin/permission/Permission";

export default async function page() {
    return (
        <RootPage protect>
            <Permission />
        </RootPage>
    );
}
