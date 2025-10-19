import Header from "@/components/Header";
import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto px-8 sm:px-16 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
