import Header from "@/components/Header";
import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-8 sm:p-16">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
