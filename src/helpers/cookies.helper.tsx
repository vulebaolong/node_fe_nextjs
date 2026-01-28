"use server";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/app.constant";
import { cookies } from "next/headers";

export async function getCookieHeader() {
    const cookieStore = await cookies();
    return cookieStore.toString();
}

export async function setCookieHeader(cookieStr: string) {
    const parts = cookieStr.split(";").map((p) => p.trim());

    // Parse name=value
    const [nameValue, ...attrParts] = parts;
    const [name, ...valParts] = nameValue.split("=");
    const value = valParts.join("=");

    // Holder cho options
    const options: Record<string, any> = {};

    // Parse từng attribute
    for (const attr of attrParts) {
        const [rawKey, rawVal] = attr.split("=");
        const key = rawKey.trim().toLowerCase();

        switch (key) {
            case "path":
                options.path = rawVal?.trim() ?? "/";
                break;
            case "max-age":
                options.maxAge = Number(rawVal);
                break;
            case "expires":
                options.expires = new Date(rawVal);
                break;
            case "domain":
                options.domain = rawVal?.trim();
                break;
            case "secure":
                options.secure = true;
                break;
            case "httponly":
                options.httpOnly = true;
                break;
            case "samesite":
                // Convert SameSite cho Next.js
                const s = rawVal?.trim().toLowerCase();
                if (s === "lax") options.sameSite = "lax";
                else if (s === "strict") options.sameSite = "strict";
                else if (s === "none") options.sameSite = "none";
                break;
            default:
                break;
        }
    }

    // Nếu không có path → để an toàn set `/`
    if (!options.path) options.path = "/";

    // console.log("COOKIE PARSE RESULT:", {
    //     name,
    //     value,
    //     options,
    // });

    // Set vào next/headers cookies
    (await cookies()).set(name, value, options);
}

export async function clearTokens() {
    (await cookies()).delete(REFRESH_TOKEN).delete(ACCESS_TOKEN);
}

export async function getRefreshToken() {
    return (await cookies()).get(REFRESH_TOKEN)?.value;
}
export async function getAccessToken() {
    return (await cookies()).get(ACCESS_TOKEN)?.value;
}
