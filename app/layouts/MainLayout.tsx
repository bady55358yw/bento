import { Button } from "antd";
import { Link, Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <LoggedInHeader />
      <main className="flex-1 overflow-y-auto px-8 sm:px-16 py-8">
        <Outlet />
      </main>
    </div>
  );
}

function LoggedInHeader() {
  return (
    <div className="flex justify-between items-center px-8 sm:px-16 py-4 border-b border-gray-300">
      <div className="text-colorPrimary font-semibold text-lg">Logo</div>
      <Link to="/login">
        <Button color="default" variant="text" className="text-gray-500!">
          登出
        </Button>
      </Link>
    </div>
  );
}

export default MainLayout;
