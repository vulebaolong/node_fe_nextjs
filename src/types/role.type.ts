import { TPermission } from "./permission.type";

export type TRole = {
   id: number
   name: string
   description: string
   isActive: boolean
   deletedBy: number
   isDeleted: boolean
   deletedAt: string
   createdAt: string
   updatedAt: string
 }

export type Permissions = {
   [key: string]: TPermission[];
};

export type TTogglePermissionReq = {
   roleId: number;
   permissionId: number;
};
