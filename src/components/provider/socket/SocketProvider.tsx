"use client";

import { NEXT_PUBLIC_BASE_DOMAIN_BE } from "@/constant/app.constant";
import { useAppSelector } from "@/redux/hooks";
import { createContext, useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
import io from "socket.io-client";

interface SocketContextType {
    socket: any | null;
    isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    const socketRef = useRef<any | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const info = useAppSelector((state) => state.user.info);

    useEffect(() => {
        (async () => {
            if (!socketRef.current && info?.id) {
                console.log("Initializing socket...");
                socketRef.current = io(NEXT_PUBLIC_BASE_DOMAIN_BE, {
                    query: { userId: info.id },
                    auth: { token: "" },
                    transports: ["websocket", "polling"],
                    secure: false,
                });

                socketRef.current.on("connect", () => {
                    console.log(`Connected: ${socketRef.current?.id}`);
                    setIsConnected(true);
                });

                socketRef.current.on("disconnect", () => {
                    console.log("Disconnected");
                    setIsConnected(false);
                });
            }
        })();

        return () => {
            if (socketRef.current) {
                console.log("Closing socket connection...");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [info?.id]);

    return <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>{children}</SocketContext.Provider>;
}
