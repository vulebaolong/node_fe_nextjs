import { TBaseTimestamps } from "./base.type";

export type TPermission = {
   _id: string;
   name: string;
   endpoint: string;
   method: string;
   module: string;
   isActive?: boolean;
} & TBaseTimestamps;

export type TListPermissionByRole = TPermission & {
   RolePermissions: TRolePermission | null;
};

export type TRolePermission = {
   _id: string;
   roleId: number;
   permissionId: number;
   isActive: boolean;
} & TBaseTimestamps;
