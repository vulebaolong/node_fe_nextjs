import { TPermission } from "./permission.type";

export type TListRoleRes = {
   id: number;
   name: string;
   description: string;
   isActive: boolean;
   deletedBy: number;
   isDeleted: boolean;
   deletedAt: string;
   createdAt: string;
   updatedAt: string;
};

export type Permissions = {
   [key: string]: TPermission[];
};

export type TTogglePermissionReq = {
   role_id: number;
   permission_id: number;
};
