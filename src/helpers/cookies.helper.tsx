'use server'

import { ACCESS_TOKEN, NEXT_LOCALE, REFRESH_TOKEN } from "@/constant/app.constant";
import { cookies } from "next/headers";

export async function setRefreshToken(refreshToken: string) {
   (await cookies()).set(REFRESH_TOKEN, refreshToken);
}
export async function setAccessToken(accessToken: string) {
   (await cookies()).set(ACCESS_TOKEN, accessToken);
}
export async function getRefreshToken() {
   return (await cookies()).get(REFRESH_TOKEN)?.value;
}
export async function getAccessToken() {
   return (await cookies()).get(ACCESS_TOKEN)?.value;
}
export async function getLocale() {
   return (await cookies()).get(NEXT_LOCALE)?.value;
}
export async function clearTokens() {
   (await cookies()).delete(REFRESH_TOKEN).delete(ACCESS_TOKEN);
}
