import {
   getInfoAction,
   loginFacebookction,
   loginFormAction,
   loginFormGaAction,
   loginGoogleWithTotpAction,
   loginGooleAction,
   loginGooleGaAction,
   registerAction,
} from "@/api/actions/auth.action";
import { resError } from "@/helpers/function.helper";
import useRouter from "@/hooks/use-router-custom";
import { useAppDispatch } from "@/redux/hooks";
import { SET_INFO } from "@/redux/slices/user.slice";
import { TLoginFormGaReq, TLoginFormReq, TLoginGoogleGaReq, TLoginGoogleWithTotpReq, TRegisterReq } from "@/types/auth.type";
import { TLoginFacebookReq } from "@/types/facebook.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetInfoMutation = () => {
   const dispatch = useAppDispatch();
   const router = useRouter();
   return useMutation({
      mutationFn: async () => {
         try {
            const { data, status, message } = await getInfoAction();
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useGetInfoMutation: data });
            dispatch(SET_INFO(data));
            return true;
         } catch (error) {
            console.log(error);
            router.push("/login");
            return false;
         }
      },
   });
};

export const useGetInfoQuery = () => {
   const dispatch = useAppDispatch();

   return useQuery({
      queryKey: ["query-info"],
      queryFn: async () => {
         try {
            const { data, status, message } = await getInfoAction();
            if (status === "error" || data === null) throw new Error(message);
            console.log({ useGetInfoQuery: data });
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
         const { data, status, message } = await registerAction(payload);
         if (status === "error" || data === null) throw new Error(message);
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
         const { data, status, message } = await loginFormAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         toast.error(resError(error, `Login failed`));
      },
   });
};

export const useLoginGoogleWithTotp = () => {
   return useMutation({
      mutationFn: async (payload: TLoginGoogleWithTotpReq) => {
         const { data, status, message } = await loginGoogleWithTotpAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         toast.error(resError(error, `Login failed`));
      },
   });
};

export const useLoginFacebook = () => {
   return useMutation({
      mutationFn: async (payload: TLoginFacebookReq) => {
         const { data, status, message } = await loginFacebookction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login with facebook failed`));
      },
   });
};

export const useLoginGoogle = () => {
   return useMutation({
      mutationFn: async (payload: { code: string }) => {
         const { data, status, message } = await loginGooleAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login with google failed`));
      },
   });
};

export const useLoginFormGa = () => {
   return useMutation({
      mutationFn: async (payload: TLoginFormGaReq) => {
         const { data, status, message } = await loginFormGaAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login with TOTP failed`));
      },
   });
};

export const useLoginGoogleGa = () => {
   return useMutation({
      mutationFn: async (payload: TLoginGoogleGaReq) => {
         const { data, status, message } = await loginGooleGaAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login with GG/TOTP failed`));
      },
   });
};
