import { ReactNode } from "react";
import classes from "./ClientLayout.module.css";
import HeaderClient from "@/components/header-client/HeaderClient";
import FooterClient from "@/components/footer-client/FooterClient";
import ChatContainer from "@/components/chat/chat-container/ChatContainer";

type TProps = {
   children: ReactNode;
};

export default function ClientLayout({ children }: TProps) {
   return (
      <>
         <HeaderClient />
         <main className={`${classes.main}`}>
            <div className={`${classes[`home-page`]}`}>{children}</div>
            <div>
               <div className={`${classes[`footer-spacer`]}`}></div>
               <div className={`${classes[`footer-wraper`]}`}>
                  <FooterClient />
               </div>
            </div>
         </main>
         <ChatContainer />
      </>
   );
}
