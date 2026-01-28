"use client";

import { logout } from "@/api/core.api";
import { useGetInfoMutation } from "@/api/tantask/auth.tanstack";
import { useEffect, useState } from "react";

type TProps = {
    children: React.ReactNode;
};

export default function Template({ children }: TProps) {
    const getInfo = useGetInfoMutation();
    const [allowRender, setAllowRender] = useState(false);

    useEffect(() => {
        getInfo.mutate(undefined, {
            onSuccess: () => {
                setAllowRender(true);
            },
            onError: () => {
                setAllowRender(false);
                logout();
            },
        });
    }, []);

    return <>{allowRender && children}</>;
}
