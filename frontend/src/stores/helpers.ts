import { createJSONStorage } from "zustand/middleware";

export const local = createJSONStorage(() => localStorage);
export const session = createJSONStorage(() => sessionStorage);
