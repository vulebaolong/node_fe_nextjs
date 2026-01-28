"use client";

import { getAccessToken, getRefreshToken } from "@/helpers/cookies.helper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginCallback() {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const refreshToken = await getRefreshToken();
            const accessToken = await getAccessToken();
            if (refreshToken && accessToken) {
                router.replace("/");
            } else {
                router.replace("/login");
            }
            // const isTotp = searchParams.get("isTotp");
            // if (isTotp === "true") {
            //     const email = searchParams.get("email");
            //     dispatch(SET_EMAIL(email));
            //     router.replace("/login");
            // } else {
            //     const accessToken = searchParams.get("accessToken");
            //     const refreshToken = searchParams.get("refreshToken");

            //     if (accessToken) await setAccessToken(accessToken);
            //     if (refreshToken) await setRefreshToken(refreshToken);
            //     router.replace("/");
            // }
        })();
    }, []);
    return <></>;
}
