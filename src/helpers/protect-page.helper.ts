import { getAccessToken } from "./cookies.helper";

const protectPage = async (currentPath: string) => {
   const protectedRoutes = ["/register"];
   const isProtect = protectedRoutes.some((route) => {
      return currentPath.startsWith(route);
   });
   if (isProtect) {
      const data = await fetch("http://localhost:3069/auth/get-info", {
         method: "GET",
         headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
         },
      });
      console.log({ data: await data.json() });
      return data.ok;
   }
};

export default protectPage;
