import AdminLayout from "@/layouts/admin-layout/AdminLayout";

type TProps = {
   children: React.ReactNode;
};

export default function layout({ children }: TProps) {
   return <AdminLayout>{children}</AdminLayout>;
}
 