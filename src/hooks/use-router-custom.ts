import { useAppDispatch } from "@/redux/hooks";
import { SET_LOADING_PAGE } from "@/redux/slices/setting.slice";
import { PrefetchOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter as useRouterNext } from "next/navigation";
import { useEffect, useTransition } from "react";

function useRouter() {
   const router = useRouterNext();
   const [isPending, startTransition] = useTransition();
   const dispatch = useAppDispatch();
   useEffect(() => {
      // console.log({ isPending });
      dispatch(SET_LOADING_PAGE(isPending));
   }, [isPending]);

   function back() {
      startTransition(() => {
         router.back();
      });
   }
   function forward() {
      startTransition(() => {
         router.forward();
      });
   }
   function refresh() {
      startTransition(() => {
         router.refresh();
      });
   }
   function push(path: string) {
      startTransition(() => {
         router.push(path);
      });
   }
   function replace(path: string) {
      startTransition(() => {
         router.replace(path);
      });
   }
   function prefetch(href: string, options?: PrefetchOptions | undefined) {
      startTransition(() => {
         router.prefetch(href, options);
      });
   }
   return { back, forward, push, refresh, replace, prefetch, isPending };
}

export default useRouter;
