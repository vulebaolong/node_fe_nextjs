"use client";
import FooterAdmin from "@/components/footer/footer-admin/FooterAdmin";
import HeaderAdmin from "@/components/header/header-admin/HeaderAdmin";
import NavbarAdmin from "@/components/navbar-admin/NavbarAdmin";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const breakpoint = `md`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
   const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

   return (
      <AppShell
         header={{ height: `var(--height-header)` }}
         footer={{ height: 40 }}
         navbar={{
            width: 200,
            breakpoint: breakpoint,
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
         }}
         padding="md"
      >
         <AppShell.Header>
            <HeaderAdmin mobileOpened={mobileOpened} desktopOpened={desktopOpened} toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} />
         </AppShell.Header>
         <AppShell.Navbar p="md">
            <NavbarAdmin closeMobile={closeMobile} />
         </AppShell.Navbar>
         <AppShell.Main>{children}</AppShell.Main>
         <AppShell.Footer>
            <FooterAdmin />
         </AppShell.Footer>
      </AppShell>
   );
}
