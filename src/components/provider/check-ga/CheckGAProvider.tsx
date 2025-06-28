import ModalVerifyGA from "@/components/modal/modal-verify-ga/ModalVerifyGA";
import { CLOSE_MODAL_CHECK_GA } from "@/constant/ga.constant";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SET_MODAL_VERIFY_GA } from "@/redux/slices/ga.slice";
import { TPayloadTotpVerify } from "@/types/totp.type";
import { ReactNode } from "react";

type TProps = {
   children: ReactNode;
};

let resolveGA: ((value: TPayloadTotpVerify) => void) | null = null;
let rejectGA: ((reason?: any) => void) | null = null;

export function waitForCheckGA(dispatch: any): Promise<TPayloadTotpVerify> {
   return new Promise<any>((resolve, reject) => {
      dispatch(SET_MODAL_VERIFY_GA(true));
      resolveGA = resolve;
      rejectGA = reject;
   });
}

export default function CheckGAProvider({ children }: TProps) {
   const dispatch = useAppDispatch();
   const opened = useAppSelector((state) => state.ga.openedModalVerifyGA);

   const handleCloseModalGA = () => {
      if (rejectGA) {
         rejectGA(CLOSE_MODAL_CHECK_GA);
         rejectGA = null;
      }
      dispatch(SET_MODAL_VERIFY_GA(false));
   };

   const handleCompleteGA = (token: string) => {
      if (resolveGA) {
         resolveGA({ token: token });
         resolveGA = null;
      }
      dispatch(SET_MODAL_VERIFY_GA(false));
      // verifyGA.mutate(
      //    { token: token },
      //    {
      //       onSuccess: (data) => {
      //          if (resolveGA) {
      //             resolveGA({ token: token });
      //             resolveGA = null;
      //          }
      //          dispatch(SET_MODAL_VERIFY_GA(false));
      //       },
      //    }
      // );
   };

   return (
      <>
         {children}
         <ModalVerifyGA opened={opened} close={handleCloseModalGA} onComplete={handleCompleteGA} />
      </>
   );
}
