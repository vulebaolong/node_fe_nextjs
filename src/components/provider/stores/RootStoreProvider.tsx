import { createCounterStore } from "@/stores/count.store";
import { createSettingsStore } from "@/stores/settings.store";
import { createUserStore } from "@/stores/user.store";
import { ReactNode, createContext, useContext, useRef } from "react";

export interface RootStore {
   counter: ReturnType<typeof createCounterStore>;
   user: ReturnType<typeof createUserStore>;
   settings: ReturnType<typeof createSettingsStore>;
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
   const storeRef = useRef<RootStore | null>(null);

   if (!storeRef.current) {
      storeRef.current = {
         counter: createCounterStore(),
         user: createUserStore(),
         settings: createSettingsStore(),
      };
   }

   return <RootStoreContext.Provider value={storeRef.current}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => {
   const storeContext = useContext(RootStoreContext);
   if (!storeContext) {
      throw new Error("useRootStore must be used within RootStoreProvider");
   }
   return storeContext;
};
