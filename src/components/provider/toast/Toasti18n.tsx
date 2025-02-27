// 'use client';

// import { t } from "i18next";
// import { toast as originalToast, ToastContent, ToastOptions, Id, UpdateOptions } from "react-toastify";

// // Define the type for the ToastMethod
// type ToastMethod = (content: ToastContent, options?: ToastOptions) => Id;

// // Create a higher-order function to wrap the toast methods with i18next translations
// const createToastMethod = (method: ToastMethod): ToastMethod => {
//   return (content: ToastContent, options?: ToastOptions) => {
//     return method(
//       typeof content === "string" ? t(content) : content, 
//       options
//     );
//   };
// };

// // Define the custom toast object with success, error, info, etc.
// export const toast = {
//   success: createToastMethod(originalToast.success),
//   error: createToastMethod(originalToast.error),
//   info: createToastMethod(originalToast.info),
//   warning: createToastMethod(originalToast.warning),
//   dark: createToastMethod(originalToast.dark),

//   dismiss(id?: string | number) {
//     originalToast.dismiss(id);
//   },
//   isActive(id: Id) {
//     return originalToast.isActive(id);
//   },
//   update(toastId: Id, options: UpdateOptions) {
//     originalToast.update(toastId, options);
//   },
//   done(id: Id) {
//     originalToast.done(id);
//   },
//   promise: originalToast.promise,
//   loading: createToastMethod(originalToast.loading),
// };
