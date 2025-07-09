export const MOBILE_VISIBLE_DESKTOP_HIDDEN = `mantine-hidden-from-md`;
export const MOBILE_HIDDEN_DESKTOP_VISIBLE = `mantine-visible-from-md`;
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const NEXT_LOCALE = "NEXT_LOCALE";
export const COLOR_KEYS = "user-color-theme";

export const NEXT_PUBLIC_BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "http://localhost:3069/";
export const NEXT_PUBLIC_BASE_DOMAIN_API = `${NEXT_PUBLIC_BASE_DOMAIN}api/`;

export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY = process.env.NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY;
export const FOLDER_IMAGE_BE = `public/images/`;

export const TITLE = `Cyber Community`;
export const LOGO = `/images/logo/logo-512x512.png`;

export const USER_ADMIN = `685a841653144894fc7cef97`;

console.log({
   NEXT_PUBLIC_BASE_DOMAIN,
   NEXT_PUBLIC_BASE_DOMAIN_API,
   NEXT_PUBLIC_GOOGLE_CLIENT_ID,
   NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY,
});
