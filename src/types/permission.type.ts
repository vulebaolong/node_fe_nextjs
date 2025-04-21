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
   isActive?: number;
};

export type TPermissionGroupByMoudleRes = {
   [key: string]: (TPermission & { Role_Permissions: TRolePermission })[];
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
