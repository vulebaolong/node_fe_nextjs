"use server";

import { ENDPOINT } from "@/constant/endpoint.constant";
import api from "@/helpers/api.helper";
import { TRes } from "@/types/app.type";
import { TPermissionGroupByMoudleRes } from "@/types/permission.type";

export async function getPermissionGroupByModuleAction(roleId: string) {
   try {
      const { data } = await api.get<TRes<TPermissionGroupByMoudleRes>>(`${ENDPOINT.PERMISSION_GROUP_BY_MODULE}/${roleId}`);
      return data;
   } catch (error) {
      console.error("Permission Group By Module failed:", error);
      throw error;
   }
}
