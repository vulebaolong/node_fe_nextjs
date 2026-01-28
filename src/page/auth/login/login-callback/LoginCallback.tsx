"use client";

import { ROUTER_CLIENT } from "@/constant/router.constant";
import { getAccessToken, getRefreshToken } from "@/helpers/cookies.helper";
import { useAppDispatch } from "@/redux/hooks";
import { SET_EMAIL } from "@/redux/slices/ga.slice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            const isTotp = searchParams.get("isTotp");
            if (isTotp === "true") {
                const email = searchParams.get("email");
                dispatch(SET_EMAIL(email));
                router.replace(ROUTER_CLIENT.LOGIN);
            } else {
                const refreshToken = await getRefreshToken();
                const accessToken = await getAccessToken();
                if (refreshToken && accessToken) {
                    router.replace("/");
                } else {
                    router.replace(ROUTER_CLIENT.LOGIN);
                }
            }
        })();
    }, []);
    return <></>;
}
