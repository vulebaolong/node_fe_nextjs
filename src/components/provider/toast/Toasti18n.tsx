// "use client";

// import { useTranslations } from "next-intl";
// import { Id, toast as originalToast, ToastContent, ToastOptions, UpdateOptions } from "react-toastify";

// export const useAppToast = () => {
//    const t = useTranslations();

//    const createToastMethod = (method: (content: ToastContent, options?: ToastOptions) => Id) => {
//       return (content: ToastContent, options?: ToastOptions) => {
//          const translatedContent = typeof content === "string" ? t(content) : content;
//          return method(translatedContent, options);
//       };
//    };

//    return {
//       success: createToastMethod(originalToast.success),
//       error: createToastMethod(originalToast.error),
//       info: createToastMethod(originalToast.info),
//       warning: createToastMethod(originalToast.warning),
//       dark: createToastMethod(originalToast.dark),
//       loading: createToastMethod(originalToast.loading),
//       dismiss(id?: Id) {
//          originalToast.dismiss(id);
//       },
//       isActive(id: Id) {
//          return originalToast.isActive(id);
//       },
//       update(toastId: Id, options: UpdateOptions) {
//          originalToast.update(toastId, options);
//       },
//       done(id: Id) {
//          originalToast.done(id);
//       },
//       promise: originalToast.promise,
//    };
// };
