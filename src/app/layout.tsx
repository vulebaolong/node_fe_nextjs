import Provider from "@/components/provider/Provider";
import { LOGO } from "@/constant/app.constant";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata = async (): Promise<Metadata> => {
   return {
      title: "Cyber Community - Connect & Share",
      description: "Cyber Community is a modern social network where you can connect, share, and chat with people in the community.",
      keywords: [
         "cyber community",
         "social network",
         "connect with friends",
         "share moments",
         "post updates",
         "chat online",
         "messaging",
         "Vietnam social media",
         "timeline",
         "make friends",
      ],
      authors: [{ name: "Cyber Community Team" }],
      icons: {
         icon: LOGO,
         apple: LOGO,
      },
      openGraph: {
         title: "Cyber Community - The New Generation Social Network",
         description: "Join Cyber Community to connect with friends, share your life, and chat in a modern and secure platform.",
         url: "https://fe-node.vulebaolong.com",
         type: "website",
         images: [
            {
               url: LOGO,
               width: 800,
               height: 600,
               alt: "Cyber Community Logo",
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title: "Cyber Community - The New Generation Social Network",
         description: "Connect, share, and chat with your friends on Cyber Community.",
         images: [LOGO],
      },
   };
};

type TProps = {
   children: React.ReactNode;
};

export default async function RootLayout({ children }: TProps) {
   const locale = await getLocale();
   const messages = await getMessages();

   return (
      <html lang={locale} {...mantineHtmlProps} suppressHydrationWarning>
         <head>
            <ColorSchemeScript />
         </head>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <NextIntlClientProvider messages={messages}>
               <Provider>{children}</Provider>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
