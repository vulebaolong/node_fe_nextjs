import {
   getInfoAction,
   loginFacebookction,
   loginFormAction,
   loginGoogleAuthenticatorAction,
   loginGooleAction,
   registerAction,
} from "@/actions/auth.action";
import { resError } from "@/helpers/function.helper";
import { useAppDispatch } from "@/redux/hooks";
import { SET_INFO } from "@/redux/slices/user.slice";
import { TLoginFormReq, TRegisterReq } from "@/types/auth.type";
import { TLoginFacebookReq } from "@/types/facebook.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetInfo = () => {
   const dispatch = useAppDispatch();
   return useMutation({
      mutationFn: async () => {
         const data = await getInfoAction();
         console.log({ useGetInfo: data });
         dispatch(SET_INFO(data));
         return data;
      },
   });
};

export const useQueryInfo = () => {
   const dispatch = useAppDispatch();

   return useQuery({
      queryKey: ["query-info"],
      queryFn: async () => {
         try {
            const data = await getInfoAction();
            if (!data) return null;
            console.log({ useGetInfo: data });
            dispatch(SET_INFO(data));
            return data;
         } catch (error) {
            console.log(error);
            return null;
         }
      },
   });
};

export const useRegister = () => {
   return useMutation({
      mutationFn: async (payload: TRegisterReq) => {
         const data = await registerAction(payload);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Register failed`));
      },
   });
};

export const useLoginForm = () => {
   return useMutation({
      mutationFn: async (payload: TLoginFormReq) => {
         const data = await loginFormAction(payload);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login failed`));
      },
   });
};

export const useLoginGoogleAuthenticator = () => {
   return useMutation({
      mutationFn: async (payload: TLoginFormReq) => {
         const data = await loginGoogleAuthenticatorAction(payload);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login failed`));
      },
   });
};

export const useLoginFacebook = () => {
   return useMutation({
      mutationFn: async (payload: TLoginFacebookReq) => {
         const data = await loginFacebookction(payload);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login failed`));
      },
   });
};

export const useLoginGoolge = () => {
   return useMutation({
      mutationFn: async (payload: { code: string }) => {
         const data = await loginGooleAction(payload);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login failed`));
      },
   });
};
