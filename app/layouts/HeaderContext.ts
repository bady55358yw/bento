import { createContext } from "react";

type HeaderContextType = {
  headerMode: string;
  setHeaderMode: (mode: "full" | "withoutLogin" | "none") => void;
};

export const HeaderContext = createContext<HeaderContextType>({
  headerMode: "full",
  setHeaderMode: () => {},
});
