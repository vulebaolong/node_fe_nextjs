import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
   reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**", // Cho phép tất cả các hostname
         },
         {
            protocol: "http",
            hostname: "**", // Cho phép tất cả các hostname
         },
      ],
      dangerouslyAllowSVG: true, // Nếu bạn muốn cho phép SVG
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
   },
};

export default withNextIntl(nextConfig);
