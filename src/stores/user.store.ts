import { create } from "zustand";

export interface UserState {
   name: string;
   setName: (name: string) => void;
}

export const createUserStore = () =>
   create<UserState>()((set) => ({
      name: "Guest",
      setName: (name) => set(() => ({ name })),
   }));
