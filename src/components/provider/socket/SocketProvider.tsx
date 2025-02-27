"use client";

import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { BASE_DOMAIN_API } from "@/constant/app.constant";

const SOCKET_URL = BASE_DOMAIN_API;

interface SocketContextType {
   socket: Socket | null;
   isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
   const socketRef = useRef<Socket | null>(null);
   const [isConnected, setIsConnected] = useState(false);
   const info = useAppSelector((state) => state.user.info); // Lấy user ID từ Redux

   useEffect(() => {
      if (!socketRef.current && info?.id) {
         console.log("Initializing socket...");
         socketRef.current = io(SOCKET_URL, {
            query: { userId: info.id },
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

      return () => {
         if (socketRef.current) {
            console.log("Closing socket connection...");
            socketRef.current.disconnect();
            socketRef.current = null;
         }
      };
   }, [info?.id]); // ✅ Chỉ kết nối khi user ID thay đổi

   return <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>{children}</SocketContext.Provider>;
}

export function useSocket() {
   const context = useContext(SocketContext);
   if (!context) {
      throw new Error("useSocket must be used within a SocketProvider");
   }
   return context;
}
