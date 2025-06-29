import { totpDisableAction, totpGenerateAction, totpSaveAction } from "@/actions/totp.action";
import { waitForCheckGA } from "@/components/provider/check-ga/CheckGAProvider";
import { CLOSE_MODAL_CHECK_GA } from "@/constant/ga.constant";
import { resError } from "@/helpers/function.helper";
import { useAppDispatch } from "@/redux/hooks";
import { TPayloadTotpSave } from "@/types/totp.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useTotpGenerate = () => {
   return useMutation({
      mutationFn: async () => {
         const { data, status, message } = await totpGenerateAction();
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Generate totp failed`));
      },
   });
};

export const useTotpSave = () => {
   return useMutation({
      mutationFn: async (payload: TPayloadTotpSave) => {
         const { data, status, message } = await totpSaveAction(payload);
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Save totp failed`));
      },
   });
};

export const useTotpDisable = () => {
   const dispatch = useAppDispatch();

   return useMutation({
      mutationFn: async () => {
         const { token } = await waitForCheckGA(dispatch);
         const { data, status, message } = await totpDisableAction({ token });
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
      onError: (error) => {
         console.log(error);
         if (error.message === CLOSE_MODAL_CHECK_GA) return;
         toast.error(resError(error, `Disable totp failed`));
      },
   });
};
