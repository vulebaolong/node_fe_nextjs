import { createPermissionsAction, deletePermissionsAction, getListPermissionByRoleAction, getPermissionsAction, TCreatePermissionAction, TUpdatePermissionAction, updatePermissionsAction } from "@/api/actions/permission.action";
import { TPayloadTable } from "@/components/custom/table/TableCustom";
import { resError } from "@/helpers/function.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { toast } from "react-toastify";

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

export const usePermissions = (payload: TPayloadTable) => {
    return useQuery({
        queryKey: ["permissions", payload],
        queryFn: async () => {
            const { data, status, message } = await getPermissionsAction(
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

export const useCreatePermissions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: TCreatePermissionAction) => {
            const { data, status, message } = await createPermissionsAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`permissions`] });
            toast.success(`Create permission successfully`);
        },
        onError: (error) => {
            toast.error(resError(error, `Create permission failed`));
        },
    });
};

export const useUpdatePermissions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: TUpdatePermissionAction) => {
            const { data, status, message } = await updatePermissionsAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`permissions`] });
            toast.success(`Update Permission successfully`);
        },
        onError: (error) => {
            toast.error(resError(error, `Update Permission failed`));
        },
    });
};


export const useDeletePermissions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: string) => {
            const { data, status, message } = await deletePermissionsAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`permissions`] });
            toast.success(`Delete permission successfully`);
        },
        onError: (error) => {
            toast.error(resError(error, `Delete permission failed`));
        },
    });
};