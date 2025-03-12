import { create } from "zustand";

export interface SettingsState {
   theme: "light" | "dark";
   toggleTheme: () => void;
}

export const createSettingsStore = () =>
   create<SettingsState>()((set) => ({
      theme: "light",
      toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
   }));
