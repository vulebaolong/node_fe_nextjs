import { ReactNode } from "react";
import classes from "./ClientLayout.module.css";
import FooterClient from "@/components/footer/footer-client/FooterClient";
import ChatContainer from "@/components/chat/chat-container/ChatContainer";
import HeaderClient from "@/components/header/header-client/HeaderClient";

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
