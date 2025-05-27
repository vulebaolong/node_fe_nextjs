import { getLinkRtcAction } from "@/actions/stream-rtc.action";
import { useQuery } from "@tanstack/react-query";

export const useGetLinkRtc = (query: string) => {
   return useQuery({
      queryKey: ["stream", query],
      queryFn: async () => {
         const data = await getLinkRtcAction(query);
         return data;
      },
   });
};