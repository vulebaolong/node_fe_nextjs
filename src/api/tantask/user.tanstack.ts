import {
    editProfileAction,
    findAllChatGroupManyAction,
    findAllChatGroupOneAction,
    findAllUserAction,
    getDetailUserAction,
    searchNameUserAction,
    uploadAvatarCloudAction,
    uploadAvatarLocalAction,
} from "@/api/actions/user.action";
import { TEditProfileReq } from "@/types/user.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUploadAvatarLocal = () => {
    return useMutation({
        mutationFn: async (payload: FormData) => {
            const { data, status, message } = await uploadAvatarLocalAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useUploadAvatarLocal: data });
            return data;
        },
    });
};

export const useUploadAvatarCloud = () => {
    return useMutation({
        mutationFn: async (payload: FormData) => {
            const { data, status, message } = await uploadAvatarCloudAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useUploadAvatarCloud: data });
            return data;
        },
    });
};

export const useFindAllUser = () => {
    return useQuery({
        queryKey: ["user-list"],
        queryFn: async () => {
            const { data, status, message } = await findAllUserAction();
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useFindAllUser: data });
            return data;
        },
    });
};

export const useFindAllChatGroupOne = () => {
    return useQuery({
        queryKey: ["chat-group-list-one"],
        queryFn: async () => {
            const { data, status, message } = await findAllChatGroupOneAction();
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useFindAllChatGroupOne: data });
            return data;
        },
    });
};

export const useFindAllChatGroupMany = () => {
    return useQuery({
        queryKey: ["chat-group-list-many"],
        queryFn: async () => {
            const { data, status, message } = await findAllChatGroupManyAction();
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useFindAllChatGroupMany: data });
            return data;
        },
    });
};

export const useSearchNameUser = () => {
    return useMutation({
        mutationFn: async (payload: string) => {
            const { data, status, message } = await searchNameUserAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            // await wait(5000);
            console.log({ useSearchNameUser: data });
            return data;
        },
    });
};

export const useDetailUser = (id: string) => {
    return useQuery({
        queryKey: [`detail-user`, id],
        queryFn: async () => {
            const { data, status, message } = await getDetailUserAction(id);
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useDetailUser: data });
            return data;
        },
    });
};

export const useEditProfile = () => {
    return useMutation({
        mutationFn: async (payload: TEditProfileReq) => {
            const { data, status, message } = await editProfileAction(payload);
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useEditProfile: data });
            return data;
        },
    });
};
