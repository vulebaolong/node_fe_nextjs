import { clearTokensAction } from "@/actions/auth.action";
import { NEXT_PUBLIC_BASE_DOMAIN_API } from "@/constant/app.constant";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "./cookies.helper";

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
   failedQueue.forEach((prom) => {
      if (error) {
         prom.reject(error);
      } else {
         prom.resolve(token!);
      }
   });
   failedQueue = [];
};

export const refreshToken = async () => {
   if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
         failedQueue.push({ resolve, reject });
      });
   }

   isRefreshing = true;

   try {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();

      const res = await fetch(`${NEXT_PUBLIC_BASE_DOMAIN_API}auth/refresh-token`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ accessToken, refreshToken }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Refresh Token Failed");

      await setAccessToken(data.data.accessToken);
      await setRefreshToken(data.data.refreshToken);

      processQueue(null, data.data.accessToken);
      return data.data.accessToken;
   } catch (err) {
      processQueue(err, null);
      throw err;
   } finally {
      isRefreshing = false;
   }
};

export async function logout(urlRedirect: string = `/login`) {
   await clearTokensAction();

   if (typeof window !== "undefined") {
      // Client
      if (urlRedirect) window.location.href = urlRedirect;
   }
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

      let accessToken = await getAccessToken();

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

      // ✅ Xử lý lỗi 403: Access Token không hợp lệ hoặc đã hết hạn → Cần refresh token
      if (response.status === 403) {
         console.log(`(${response.status}) Access Token không hợp lệ hoặc đã hết hạn → Cần refresh token`);
         try {
            accessToken = await refreshToken();
            response = await fetch(`${NEXT_PUBLIC_BASE_DOMAIN_API}${url}`, {
               ...options,
               headers: {
                  ...(options.headers || {}),
                  Authorization: `Bearer ${accessToken}`,
               },
            });
         } catch (err) {
            console.error("❌ Refresh Token Error", err);
            throw err;
         }
      }

      // ✅ Xử lý lỗi 401: không có quyền truy cập tài nguyên ngay cả khi đã đăng nhập -> Logout
      if (response.status === 401) {
         console.log(`(${response.status}) không có quyền truy cập tài nguyên ngay cả khi đã đăng nhập -> Logout`);
         await logout();
         // throw new Error("Unauthorized, logging out...");
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
const api = new APIClient(NEXT_PUBLIC_BASE_DOMAIN_API);

export default api;
