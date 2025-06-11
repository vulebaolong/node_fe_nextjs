import { findAllChatGroupAction, findAllChatGroupByTokenAction, findAllUserAction, getDetailUserAction, searchNameUserAction, uploadAvatarCloudAction, uploadAvatarLocalAction } from "@/actions/user.action";
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

export const useFindAllChatGroup = () => {
   return useQuery({
      queryKey: ["chat-group-list"],
      queryFn: async () => {
         const data = await findAllChatGroupAction();
         return data;
      },
   });
};

export const useFindAllChatGroupByToken = () => {
   return useQuery({
      queryKey: ["chat-group-by-token-list"],
      queryFn: async () => {
         const data = await findAllChatGroupByTokenAction();
         return data;
      },
   });
};

export const useSearchNameUser = () => {
   return useMutation({
      mutationFn: async (payload: string) => {
         const data = await searchNameUserAction(payload);
         return data;
      },
   });
};

export const useDetailUser = (id: string) => {
   return useQuery({
      queryKey: [`detail-user`, id],
      queryFn: async () => {
         const data = await getDetailUserAction(id);
         return data;
      },
   });
};