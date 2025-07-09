import ChatContainer from "@/components/chat/chat-container/ChatContainer";
import FooterClient from "@/components/footer/footer-client/FooterClient";
import HeaderClient from "@/components/header/header-client/HeaderClient";
import { ReactNode } from "react";

type TProps = {
   children: ReactNode;
};

export default function ClientLayout({ children }: TProps) {
   return (
      <>
         <HeaderClient />
         <main style={{ paddingTop: `var(--height-header)` }}>
            <div
               style={{
                  position: `relative`,
                  zIndex: 1,
                  boxShadow: `var(--mantine-shadow-md)`,
                  backgroundColor: `var(--mantine-color-body)`,
                  height: `auto`,
                  minHeight: `100vh`,
               }}
            >
               {children}
            </div>
            <div>
               <div style={{ height: `400px` }}></div>
               <div style={{ position: `fixed`, bottom: 0, left: 0, right: 0 }}>
                  <FooterClient />
               </div>
            </div>
         </main>
         <ChatContainer />
      </>
   );
}
