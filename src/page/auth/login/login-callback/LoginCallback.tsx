"use client";
import { setAccessToken, setRefreshToken } from "@/helpers/cookies.helper";
import { useAppDispatch } from "@/redux/hooks";
import { SET_EMAIL } from "@/redux/slices/ga.slice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            const isTotp = searchParams.get("isTotp");
            if (isTotp === "true") {
                const email = searchParams.get("email");
                dispatch(SET_EMAIL(email));
                router.replace("/login");
            } else {
                const accessToken = searchParams.get("accessToken");
                const refreshToken = searchParams.get("refreshToken");

                if (accessToken) await setAccessToken(accessToken);
                if (refreshToken) await setRefreshToken(refreshToken);
                router.replace("/");
            }
        })();
    }, []);
    return <></>;
}
