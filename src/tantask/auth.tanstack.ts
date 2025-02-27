import { getInfoAction, loginFormAction, registerAction } from "@/actions/auth.action";
import { resError } from "@/helpers/function.helper";
import { useAppDispatch } from "@/redux/hooks";
import { SET_INFO } from "@/redux/slices/user.slice";
import { TLoginFormReq, TRegisterReq } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useGetInfo = () => {
   const dispatch = useAppDispatch();
   const router = useRouter();
   return useMutation({
      mutationFn: async () => {
         try {
            const data = await getInfoAction();
            console.log({ data });
            dispatch(SET_INFO(data));
            return true;
         } catch (error) {
            router.push("/login");
            return false;
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
         toast.error(resError(error, `Register failed`));
      },
   });
};
