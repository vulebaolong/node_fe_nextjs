import { getDetailRoleAction, getListRoleAction, getTogglePermissionAction } from "@/actions/role.action";
import { TTogglePermissionReq } from "@/types/role.type";
import { useMutation, useQuery } from "@tanstack/react-query";

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
