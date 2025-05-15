import Template from "@/template/template";

export default function template({ children }: { children: React.ReactNode }) {
  return <Template protect>{children}</Template>;
}
