import { TBaseTimestamps } from "./base.type";
import { TPermission } from "./permission.type";

export type TRole = {
   _id: string;
   name: string;
   description?: string;
   isActive: boolean;
} & TBaseTimestamps;

export type Permissions = {
   [key: string]: TPermission[];
};

export type TToggleRolePermissionReq = {
   roleId: string;
   permissionId: string;
};

export type TToggleRolePermissionRes = {
   isActive: boolean;
};

export type TToggleRoleReq = {
   roleId: string;
};


