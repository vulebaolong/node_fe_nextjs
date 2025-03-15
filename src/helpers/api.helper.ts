import { clearTokensAction } from "@/actions/auth.action";
import { BASE_DOMAIN_API } from "@/constant/app.constant";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "./cookies.helper";

async function refreshToken() {
   try {
      const res = await fetch(`${BASE_DOMAIN_API}auth/refresh-token`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            accessToken: await getAccessToken(), // ✅ Gửi Access Token cũ
            refreshToken: await getRefreshToken(), // ✅ Gửi Refresh Token
         }),
      });

      if (!res.ok) {
         const data = await res.json();
         console.log({ data });
         throw new Error("Failed to refresh token");
      }

      const data = await res.json();
      await setAccessToken(data.data.accessToken); // ✅ Lưu Access Token mới
      await setRefreshToken(data.data.refreshToken); // ✅ Lưu Refresh Token mới
      return data.data.accessToken;
   } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
   }
}

export async function logout() {
   await clearTokensAction();
   window.location.href = "/login";
}

type FetchOptions = RequestInit & { body?: any; isFormData?: boolean };

class APIClient {
   private baseURL: string;

   constructor(baseURL: string) {
      this.baseURL = baseURL;
   }

   private async request<T>(url: string, options: FetchOptions = {}): Promise<T> {
      const { body, headers, ...restOptions } = options;

      const isFormData = body instanceof FormData;

      const contentType = isFormData ? {} : { "Content-Type": "application/json" };

      const handleBody = () => {
         if (!body) return undefined;
         if (isFormData) return body;
         return JSON.stringify(body);
      };

      const accessToken = await getAccessToken();

      const optionFetch: any = {
         ...restOptions,
         headers: {
            Authorization: `Bearer ${accessToken}`,
            ...contentType,
            ...headers,
         },
         body: handleBody(),
      };

      let response = await fetch(`${this.baseURL}${url}`, optionFetch);

      // ✅ Xử lý lỗi 401: Access Token không hợp lệ hoặc đã hết hạn → Cần refresh token
      if (response.status === 401) {
         console.log(`(${response.status}) Access Token không hợp lệ hoặc đã hết hạn → Cần refresh token`);
         const newAccessToken = await refreshToken();
         // console.log({ newAccessToken });
         if (newAccessToken) {
            response = await fetch(`${this.baseURL}${url}`, {
               ...restOptions,
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${newAccessToken}`, // ✅ Dùng token mới
                  ...headers,
               },
               body: body ? JSON.stringify(body) : undefined,
            });
            return response.json();
         }
      }

      // ✅ Xử lý lỗi 401: không có quyền truy cập tài nguyên ngay cả khi đã đăng nhập -> Logout
      if (response.status === 401) {
         console.log(`(${response.status}) không có quyền truy cập tài nguyên ngay cả khi đã đăng nhập -> Logout`);
         await logout();
         throw new Error("Unauthorized, logging out...");
      }

      if (!response.ok) {
         const errorData = await response.json();
         console.log({ errorData });
         throw new Error(errorData.message || `Error ${response.status}`);
      }

      return response.json();
   }

   get<T>(url: string, options?: FetchOptions) {
      return this.request<T>(url, { ...options, method: "GET" });
   }

   post<T>(url: string, body?: any, options?: FetchOptions) {
      return this.request<T>(url, { ...options, method: "POST", body });
   }

   put<T>(url: string, body?: any, options?: FetchOptions) {
      return this.request<T>(url, { ...options, method: "PUT", body });
   }

   delete<T>(url: string, options?: FetchOptions) {
      return this.request<T>(url, { ...options, method: "DELETE" });
   }
}

// ✅ Khởi tạo API client với BASE_URL từ môi trường
const api = new APIClient(BASE_DOMAIN_API);

export default api;
