export const MOBILE_VISIBLE_DESKTOP_HIDDEN = `mantine-hidden-from-md`;
export const MOBILE_HIDDEN_DESKTOP_VISIBLE = `mantine-visible-from-md`;
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const NEXT_LOCALE = "NEXT_LOCALE";

export const BASE_DOMAIN_API = process.env.BASE_DOMAIN_API || `http://localhost:3069/`;
// export const BASE_DOMAIN_API = process.env.NEXT_PUBLIC_BASE_DOMAIN_API || `https://be-node.vulebaolong.com/`;
export const BASE_DOMAIN_CLOUDINARY = `https://res.cloudinary.com/vulebaolong/image/upload/`;
export const FOLDER_IMAGE_BE = `images/`;

export const TITLE = `Cyber Community`

console.log({
   BASE_DOMAIN_API,
   BASE_DOMAIN_API_pro: process.env.NEXT_PUBLIC_BASE_DOMAIN_API,
});
