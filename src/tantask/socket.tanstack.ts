"use client";

import { BASE_DOMAIN_API } from "@/constant/app.constant";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";


export const useSocket = () => {
   return useQuery({
      queryKey: ["socket"],
      queryFn: async () => {
         const info = useAppSelector(state => state.user.info)
         const socket = io(BASE_DOMAIN_API, {
            query: { userId: info?.id },
            transports: ["websocket", "polling"],
            rejectUnauthorized: false,
            secure: false,
         });

         return socket;
      },
   });
};