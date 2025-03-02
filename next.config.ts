import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
   reactStrictMode: false,
   images: {
      domains: ["be-node.vulebaolong.com"],
      remotePatterns: [
         {
            protocol: "http",
            hostname: "**",
            port: "",
            search: "",
         },
         {
            protocol: "https",
            hostname: "**",
            port: "",
            search: "",
         },
         {
            protocol: "https",
            hostname: "be-node.vulebaolong.com",
            pathname: "**",
         },
      ],
   },
};

export default withNextIntl(nextConfig);
