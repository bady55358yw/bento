import { createContext } from "react";

export type HeaderMode = "full" | "withoutLogin" | "none";

type HeaderContextType = {
  setHeaderMode: (mode: HeaderMode) => void;
};

export const HeaderContext = createContext<HeaderContextType>({
  setHeaderMode: () => {},
});
