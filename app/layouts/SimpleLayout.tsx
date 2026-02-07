import { Outlet } from "react-router";

function SimpleLayout() {
  return (
    <div className="h-screen flex flex-col">
      <LoggedOutHeader />
      <main className="flex-1 overflow-y-auto px-8 sm:px-16 py-8">
        <Outlet />
      </main>
    </div>
  );
}

function LoggedOutHeader() {
  return (
    <div className="flex justify-between items-center px-8 sm:px-16 py-4 border-b border-gray-300">
      <div className="text-colorPrimary font-semibold text-lg">Logo</div>
    </div>
  );
}

export default SimpleLayout;
