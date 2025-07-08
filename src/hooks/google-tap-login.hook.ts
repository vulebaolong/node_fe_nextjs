"use client";
import { CredentialResponse } from "google-one-tap";
import { useCallback, useEffect, useState } from "react";

export const useGoogleOneTapLogin = (isLogin = false) => {
    const [response, setResponse] = useState<CredentialResponse | null>(null);
    const [history, setHistory] = useState<{ message: string; timestamp: Date }[]>([]);

    const oneTap = useCallback(() => {
        const { google } = window;

        if (google) {
            if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not config");

            google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: async (response) => {
                    setResponse(response);
                    // Xử lý credential nhận được từ Google ở đây (gửi lên backend, xác thực, v.v.)
                },
            });

            // google.accounts.id.prompt() // without listening to notification
            google.accounts.id.prompt((notification) => {
                // notification: Google cung cấp để theo dõi tình trạng One Tap popup
                console.log("notification", notification);
                if (notification.isNotDisplayed()) {
                    // Nếu One Tap không hiện ra được, log lý do
                    console.log("getNotDisplayedReason:", notification.getNotDisplayedReason());
                    setHistory([
                        ...history,
                        {
                            message: "getNotDisplayedReason: " + notification.getNotDisplayedReason(),
                            timestamp: new Date(),
                        },
                    ]);
                } else if (notification.isSkippedMoment()) {
                    // Nếu user đã bỏ qua không login, log lý do
                    console.log("getSkippedReason :", notification.getSkippedReason());
                    setHistory([
                        ...history,
                        {
                            message: "getSkippedReason: " + notification.getSkippedReason(),
                            timestamp: new Date(),
                        },
                    ]);
                } else if (notification.isDismissedMoment()) {
                    // Nếu user đóng popup, log lý do
                    console.log("getDismissedReason:", notification.getDismissedReason());
                    setHistory([
                        ...history,
                        {
                            message: "getDismissedReason: " + notification.getDismissedReason(),
                            timestamp: new Date(),
                        },
                    ]);
                }
            });
        }
    }, [history]);

    useEffect(() => {
        // will show popup after two secs
        if (isLogin) return;
        const timeout = setTimeout(() => oneTap(), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [oneTap, isLogin]);

    return { response, history };
};
