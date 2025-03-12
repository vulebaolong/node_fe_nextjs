import ClientLayout from "@/layouts/client-layout/ClientLayout";

type TProps = {
   children: React.ReactNode;
};

export default function layout({ children }: TProps) {
   return <ClientLayout>{children}</ClientLayout>;
}
