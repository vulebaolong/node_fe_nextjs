import { getDetailRoleAction, getListRoleAction, getRolesAction, getTogglePermissionAction, updateRolesAction } from "@/actions/role.action";
import { TPayloadTable } from "@/components/custom/table/TableCustom";
import { resError } from "@/helpers/function.helper";
import { TTogglePermissionReq } from "@/types/role.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type TUseVideoList = {
   page: number;
   pageSize: number;
   search: string;
};

export const useListRole = ({ page, pageSize, search }: TUseVideoList) => {
   return useQuery({
      queryKey: [`list-role`, page, pageSize, search],
      queryFn: async () => {
         const query = `page=${page}&pageSize=${pageSize}&name=${search}`;
         const data = await getListRoleAction(query);
         return data;
      },
   });
};

export const useRoles = (payload: TPayloadTable) => {
   return useQuery({
      queryKey: ["roles", payload],
      queryFn: async () => {
         const result = await getRolesAction(`page=${payload.pagination.pageIndex}&pageSize=${payload.pagination.pageSize}&filters=${JSON.stringify(payload.filters)}&sortBy=${payload.sort?.sortBy}&isDesc=${payload.sort?.isDesc}`);
         console.log({ result });
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

export const useTogglePermission = () => {
   return useMutation({
      mutationFn: async (payload: TTogglePermissionReq) => {
         const data = await getTogglePermissionAction(payload);
         return data;
      },
   });
};
