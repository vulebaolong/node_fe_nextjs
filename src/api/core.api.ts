import { NEXT_PUBLIC_BASE_DOMAIN_BE_API } from "@/constant/app.constant";
import { ENDPOINT } from "@/constant/endpoint.constant";
import { getCookieHeader, setCookieHeader } from "@/helpers/cookies.helper";
import { clearTokensAction } from "./actions/auth.action";

export async function logout() {
    await clearTokensAction();
    // googleLogout();

    if (typeof window !== "undefined") {
        // Client
        window.location.reload();
        window.location.href = "/login";
    } else {
        // Server
        const { redirect } = await import("next/navigation");
        redirect("/login");
    }
}

type FetchOptions = RequestInit & { body?: any; isFormData?: boolean };

class APIClient {
    private baseURL: string;
    private isRefreshing = false;
    private refreshQueue: Array<() => void> = [];

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

        const cookieHeader = await getCookieHeader();

        const optionFetch: any = {
            ...restOptions,
            headers: {
                ...contentType,
                ...headers,
                cookie: cookieHeader,
            },
            body: handleBody(),
        };

        const response = await fetch(`${this.baseURL}/${url}`, optionFetch);

        const setCookies = response.headers.getSetCookie();
        if (setCookies) {
            for (const cookie of setCookies) {
                await setCookieHeader(cookie);
            }
        }

        // ✅ Xử lý lỗi 403: Access Token đã hết hạn → Cần refresh token
        if (response.status === 403) {
            console.log({
                status: response.status,
                url: response.url,
                message: `Access Token đã hết hạn → Cần refresh token`,
            });

            if (!this.isRefreshing) {
                this.isRefreshing = true;

                // Gọi refresh ngay lập tức
                const refreshResult = await this.refreshAccessToken();

                this.isRefreshing = false;

                if (refreshResult) {
                    // replay các request đã chờ
                    this.refreshQueue.forEach((cb) => cb());
                    this.refreshQueue = [];

                    // gọi lại request hiện tại
                    return this.request<T>(url, options);
                } else {
                    await logout();
                    throw new Error("Refresh token failed, logout.");
                }
            }

            // nếu đang refresh: request hiện tại phải chờ
            return new Promise<T>((resolve, reject) => {
                this.refreshQueue.push(() => {
                    this.request<T>(url, options).then(resolve).catch(reject);
                });
            });
        }

        // ✅ Xử lý lỗi 401: không có quyền truy cập tài nguyên ngay cả khi đã đăng nhập -> Logout
        if (response.status === 401) {
            console.log({
                status: response.status,
                url: response.url,
                message: `Không có quyền truy cập tài nguyên ngay cả khi đã đăng nhập → Logout`,
            });
            await logout();
            throw new Error("Unauthorized");
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

    patch<T>(url: string, body?: any, options?: FetchOptions) {
        return this.request<T>(url, { ...options, method: "PATCH", body });
    }

    delete<T>(url: string, options?: FetchOptions) {
        return this.request<T>(url, { ...options, method: "DELETE" });
    }

    private async refreshAccessToken() {
        try {
            const res = await this.post(ENDPOINT.AUTH.REFRESH_TOKEN);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

const api = new APIClient(NEXT_PUBLIC_BASE_DOMAIN_BE_API);

export default api;
