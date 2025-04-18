export type TPermission = {
   id: number;
   name: string;
   endpoint: string;
   method: string;
   module: string;
   deletedBy: number;
   isDeleted: boolean;
   deletedAt: string;
   createdAt: string;
   updatedAt: string;
};

export type TPermissionGroupByMoudleRes = {
   [key: string]: (TPermission & { RolePermission: TRolePermission })[];
};

export type TRolePermission = {
   id: number;
   roleId: number;
   permissionId: number;
   isActive: boolean;
   deletedBy: number;
   isDeleted: boolean;
   deletedAt: string;
   createdAt: string;
   updatedAt: string;
};
