import { onOffGoogleAuthenticatorAction } from "@/actions/google-authenticator.action";
import { useMutation } from "@tanstack/react-query";

export const useOnOffGoogleAuthenticator = () => {
   return useMutation({
      mutationFn: async () => {
         const { data, status, message } = await onOffGoogleAuthenticatorAction();
         if (status === "error" || data === null) throw new Error(message);
         return data;
      },
   });
};
