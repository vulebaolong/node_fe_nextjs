import { getDetailRoleAction, getRolesAction, toggleRolePermissionAction, getToggleRoleAction, updateRolesAction } from "@/actions/role.action";
import { TPayloadTable } from "@/components/custom/table/TableCustom";
import { resError } from "@/helpers/function.helper";
import { TToggleRolePermissionReq, TToggleRoleReq } from "@/types/role.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRoles = (payload: TPayloadTable) => {
   return useQuery({
      queryKey: ["roles", payload],
      queryFn: async () => {
         const result = await getRolesAction(
            `page=${payload.pagination.pageIndex}&pageSize=${payload.pagination.pageSize}&filters=${JSON.stringify(payload.filters)}&sortBy=${
               payload.sort?.sortBy
            }&isDesc=${payload.sort?.isDesc}`
         );
         console.log({ useRoles: result });
         return result;
      },
   });
};

export const useUpdateRoles = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (payload: any) => {
         console.log({ payload });
         const data = await updateRolesAction(payload);
         return data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [`roles`] });
         toast.success(`Update role successfully`);
      },
      onError: (error) => {
         toast.error(resError(error, `Update role failed`));
      },
   });
};

export const useDetailRole = (id: string) => {
   return useQuery({
      queryKey: [`detail-role`, id],
      queryFn: async () => {
         const data = await getDetailRoleAction(id);
         return data;
      },
   });
};

export const useToggleRolePermission = () => {
   return useMutation({
      mutationFn: async (payload: TToggleRolePermissionReq) => {
         const data = await toggleRolePermissionAction(payload);
         return data;
      },
   });
};

export const useToggleRole = () => {
   return useMutation({
      mutationFn: async (payload: TToggleRoleReq) => {
         const data = await getToggleRoleAction(payload);
         return data;
      },
   });
};
