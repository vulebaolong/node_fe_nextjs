import { totpDisableAction, totpGenerateAction, totpSaveAction } from "@/actions/totp.action";
import { waitForCheckGA } from "@/components/provider/check-ga/CheckGAProvider";
import { resError } from "@/helpers/function.helper";
import { useAppDispatch } from "@/redux/hooks";
import { TPayloadTotpDisable, TPayloadTotpSave } from "@/types/totp.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useTotpGenerate = () => {
   return useMutation({
      mutationFn: async () => {
         const data = await totpGenerateAction();
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
         const data = await totpSaveAction(payload);
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
         const data = await totpDisableAction({ token });
         return data;
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Save totp failed`));
      },
   });
};
