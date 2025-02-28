import { getQrGoogleAuthenticatorAction, onOffGoogleAuthenticatorAction } from "@/actions/google-authenticator.action";
import { useMutation } from "@tanstack/react-query";

export const useGetQrGoogleAuthenticator = () => {
   return useMutation({
      mutationFn: async () => {
         const data = await getQrGoogleAuthenticatorAction();
         return data;
      },
   });
};

export const useOnOffGoogleAuthenticator = () => {
   return useMutation({
      mutationFn: async () => {
         const data = await onOffGoogleAuthenticatorAction();
         return data;
      },
   });
};
