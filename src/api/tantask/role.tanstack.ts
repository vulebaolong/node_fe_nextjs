import { getDetailRoleAction, getRolesAction, toggleRolePermissionAction, getToggleRoleAction, updateRolesAction } from "@/api/actions/role.action";
import { TPayloadTable } from "@/components/custom/table/TableCustom";
import { resError } from "@/helpers/function.helper";
import { TToggleRolePermissionReq, TToggleRoleReq } from "@/types/role.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRoles = (payload: TPayloadTable) => {
   return useQuery({
      queryKey: ["roles", payload],
      queryFn: async () => {
         const { data, status, message } = await getRolesAction(
            `page=${payload.pagination.pageIndex}&pageSize=${payload.pagination.pageSize}&filters=${JSON.stringify(payload.filters)}&sortBy=${
               payload.sort?.sortBy
            }&isDesc=${payload.sort?.isDesc}`
         );
         if (status === "error" || data === null) throw new Error(message);
         console.log({ useRoles: data });
         return data;
      },
   });
};

export const useUpdateRoles = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (payload: any) => {
         const { data, status, message } = await updateRolesAction(payload);
         if (status === "error" || data === null) throw new Error(message);
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
         const { data, status, message } = await getDetailRoleAction(id);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
   });
};

export const useToggleRolePermission = () => {
   return useMutation({
      mutationFn: async (payload: TToggleRolePermissionReq) => {
         const { data, status, message } = await toggleRolePermissionAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
   });
};

export const useToggleRole = () => {
   return useMutation({
      mutationFn: async (payload: TToggleRoleReq) => {
         const { data, status, message } = await getToggleRoleAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
   });
};
