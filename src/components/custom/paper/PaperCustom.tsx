import { Paper as PaperMantine, PaperProps } from "@mantine/core";

export default function Paper({ children, ...rest }: { children: React.ReactNode } & PaperProps) {
   return (
      <PaperMantine shadow="md" radius="lg" withBorder p="xl" {...rest}>
         {children}
      </PaperMantine>
   );
}
