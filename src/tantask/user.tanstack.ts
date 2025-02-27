import { findAllUserAction, uploadAvatarCloudAction, uploadAvatarLocalAction } from "@/actions/user.action";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUploadAvatarLocal = () => {
   return useMutation({
      mutationFn: async (payload: FormData) => {
         const data = await uploadAvatarLocalAction(payload);
         return data;
      },
   });
};

export const useUploadAvatarCloud = () => {
   return useMutation({
      mutationFn: async (payload: FormData) => {
         const data = await uploadAvatarCloudAction(payload);
         return data;
      },
   });
};

export const useFindAllUser = () => {
   return useQuery({
      queryKey: ["user-list"],
      queryFn: async () => {
         const data = await findAllUserAction();
         return data;
      },
   });
};
