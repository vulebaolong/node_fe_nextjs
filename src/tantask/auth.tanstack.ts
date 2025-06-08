import {
   getInfoAction,
   loginFacebookction,
   loginFormAction,
   loginFormGaAction,
   loginGooleAction,
   loginGooleGaAction,
   registerAction,
} from "@/actions/auth.action";
import { resError } from "@/helpers/function.helper";
import useRouter from "@/hooks/use-router-custom";
import { useAppDispatch } from "@/redux/hooks";
import { SET_INFO } from "@/redux/slices/user.slice";
import { TLoginFormGaReq, TLoginFormReq, TLoginGoogleGaReq, TRegisterReq } from "@/types/auth.type";
import { TLoginFacebookReq } from "@/types/facebook.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useQueryInfo = () => {
   const dispatch = useAppDispatch();

   return useQuery({
      queryKey: ["query-info"],
      queryFn: async () => {
         try {
            const data = await getInfoAction();
            if (!data) return null;
            console.log({ useGetInfoMutation: data });
            dispatch(SET_INFO(data));
            return data;
         } catch (error) {
            console.log(error);
            return null;
         }
      },
   });
};

export const useGetInfoMutation = () => {
   const dispatch = useAppDispatch();
   const router = useRouter();
   return useMutation({
      mutationFn: async () => {
         try {
            const data = await getInfoAction();
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
            const data = await getInfoAction();
            if (!data) return null;
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

export const useLoginGoogle = () => {
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

export const useLoginFormGa = () => {
   return useMutation({
      mutationFn: async (payload: TLoginFormGaReq) => {
         const data = await loginFormGaAction(payload);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login failed`));
      },
   });
};

export const useLoginGoogleGa = () => {
   return useMutation({
      mutationFn: async (payload: TLoginGoogleGaReq) => {
         const data = await loginGooleGaAction(payload);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Login failed`));
      },
   });
};
