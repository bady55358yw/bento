import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { HeaderContext, type HeaderMode } from "./HeaderContext";

function BaseLayout() {
  // 雖然 https://github.com/bady55358yw/bento/issues/5 說 useState 可以自動 infer 型別，
  // 但沒有寫 useState<HeaderMode> 的話 useState 只會知道他是 string，我們更希望他只是特定的字串就好，
  // 所以這邊就需要寫 useState<HeaderMode>
  const [headerMode, setHeaderMode] = useState<HeaderMode>("full");

  return (
    <div className="h-screen flex flex-col">
      {headerMode !== "none" && <Header mode={headerMode} />}
      <main className="flex-1 overflow-y-auto px-8 sm:px-16 py-8">
        {/* 我喜歡讓 context provider 包越少東西越好，這樣在看 code 的時候可以減少負擔 */}
        {/* React 19 不需要寫 <HeaderContext.Provider>，直接 <HeaderContext> 即可 */}
        {/* https://react.dev/reference/react/createContext#provider */}
        <HeaderContext value={setHeaderMode}>
          <Outlet />
        </HeaderContext>
      </main>
    </div>
  );
}

export default BaseLayout;

// Header 也就只有 BaseLayout 用到，我會直接寫在同一個檔案，直接寫一起更簡單明瞭
function Header({ mode }: { mode: HeaderMode }) {
  // 原本是使用 useContext(HeaderContext) 來取得 headerMode，但那就得祈禱 <HeaderContext.Provider>
  // 有正確包在 <Header> 外面。
  // 改用 prop 傳入會比較明確
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

// 簡化一堆要設置 Header 的 code
// const { setHeaderMode } = useContext(HeaderContext);
// useEffect(() => {
//   setHeaderMode("withoutLogin");
// }, []);
// 變成
// <WithHeaderEffect mode="withoutLogin" />
//
// 我喜歡把這類 component 命名後綴 Effect 讓我自己知道他不會 render 任何東西，只是為了執行 useEffect
// 不過因為他比較像外面包一層 Layout 的感覺，所以我讓他收 children
export function WithHeaderEffect({
  mode,
  children,
}: {
  mode: HeaderMode;
  children: React.ReactNode;
}) {
  const setHeaderMode = useContext(HeaderContext);

  // 進階: 改用 useLayoutEffect 來確保切換頁面的時候 Header 就已經更新
  useEffect(() => {
    setHeaderMode(mode);
  }, [mode]);

  return <>{children}</>;
}
