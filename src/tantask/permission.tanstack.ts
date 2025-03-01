import { getPermissionGroupByModuleAction } from "@/actions/permission.action";
import { useQuery } from "@tanstack/react-query";

export const usePermissionGroupByModule = (roleId: string) => {
   return useQuery({
      queryKey: [`permission-by-module`, roleId],
      queryFn: async () => {
         const data = await getPermissionGroupByModuleAction(roleId)
         return data;
      },
   });
};
