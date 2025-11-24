import Header from "@/components/Header";
import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router";
import { HeaderContext } from "@/layouts/HeaderContext";

function BaseLayout() {
  const [headerMode, setHeaderMode] = useState<
    "full" | "withoutLogin" | "none"
  >("full");

  return (
    <HeaderContext.Provider value={{ headerMode, setHeaderMode }}>
      <div className="h-screen flex flex-col">
        {headerMode !== "none" && <Header />}
        <main className="flex-1 overflow-y-auto px-8 sm:px-16 py-8">
          <Outlet />
        </main>
      </div>
    </HeaderContext.Provider>
  );
}

export default BaseLayout;
