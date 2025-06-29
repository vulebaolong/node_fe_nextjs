import { getListPermissionByRoleAction } from "@/actions/permission.action";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";

export const useListPermissionByRole = (roleId: string) => {
   return useQuery({
      queryKey: [`list-permission-by-role`, roleId],
      queryFn: async () => {
         const { data, status, message } = await getListPermissionByRoleAction(roleId);
         if (status === "error" || data === null) throw new Error(message);
         
         const { page, pageSize, totalPage, totalItem, items: itemsDraw } = data;
         const items: _.Dictionary<any[]> = {};
         itemsDraw.forEach((item) => {
            item.isActive = !!item.RolePermissions;
            if (Array.isArray(items[item.module])) {
               items[item.module].push(item);
            } else {
               items[item.module] = [];
               items[item.module].push(item);
            }
         });
         return {
            page,
            pageSize,
            totalPage,
            totalItem,
            items,
         };
      },
   });
};
