import { NEXT_PUBLIC_BASE_DOMAIN_API } from "@/constant/app.constant";
import { useQuery } from "@tanstack/react-query";

const fetchGet = async (endpoint: string) => {
   try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_DOMAIN_API}${endpoint}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Dữ liệu nhận được:", data);
      return data;
   } catch (error: any) {
      console.error("❌ Lỗi khi gọi API:", error.message);
      return null;
   }
};

export const useGetDemo = (endpoint: string) => {
   return useQuery({
      queryKey: ["get-data-demo"],
      queryFn: async () => {
         return (await fetchGet(endpoint)) || [];
      },
   });
};
