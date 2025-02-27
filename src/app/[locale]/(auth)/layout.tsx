import AuthLayout from "@/layouts/auth-layout/AuthLayout";

type TProps = {
   children: React.ReactNode;
};
export default function layout({ children }: TProps) {
   return <AuthLayout>{children}</AuthLayout>;
}
