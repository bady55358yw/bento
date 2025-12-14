import {
  HeaderContext,
  type HeaderMode,
} from "@/layouts/BaseLayout/HeaderContext";
import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";

function BaseLayout() {
  const [headerMode, setHeaderMode] = useState<HeaderMode>("full");

  return (
    <div className="h-screen flex flex-col">
      {headerMode !== "none" && <Header mode={headerMode} />}
      <main className="flex-1 overflow-y-auto px-8 sm:px-16 py-8">
        <HeaderContext value={{ setHeaderMode }}>
          <Outlet />
        </HeaderContext>
      </main>
    </div>
  );
}

/* 
只有被 "HeaderContext" 包在裡面的元素才可以用 useContext，
所以 Header 改用 props 去收 mode
*/
function Header({ mode }: { mode: HeaderMode }) {
  return (
    <div className="flex justify-between items-center px-8 sm:px-16 py-4 border-b border-gray-300">
      <div className="text-colorPrimary font-semibold text-lg">Logo</div>
      {mode === "full" && (
        <Link to="/login">
          <Button color="default" variant="text" className="text-gray-500!">
            登出
          </Button>
        </Link>
      )}
    </div>
  );
}

/* 
把原本在每個頁面重複寫的 useEffect 抽出來至 WithHeaderEffect，
然後包在每個面頁外面，類似包一層 Layout

PS: 用 Effect 命名的 component 只是為了用 useEffect，並不會 render 任何東西
useEffect(() => {
    setHeaderMode(mode);
  }, []) 
*/
export function WithHeaderEffect({
  mode,
  children,
}: {
  mode: HeaderMode;
  children: React.ReactNode;
}) {
  const { setHeaderMode } = useContext(HeaderContext);
  useEffect(() => {
    setHeaderMode(mode);
  }, []);

  return <>{children}</>;
}

export default BaseLayout;
