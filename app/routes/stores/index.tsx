import { reset } from "@/api/reset";
import type { Store } from "@/api/stores/getStore";
import { getStoreList, type StoreListRes } from "@/api/stores/getStoreList";
import Loading from "@/components/Loading";
import { ClearOutlined, PlusOutlined } from "@ant-design/icons";
import StoreCard from "@components/StoreCard";
import { Button, Spin } from "antd";
import { Suspense, useEffect, useRef, useState } from "react";
import { Await, Link, useLoaderData, useRevalidator } from "react-router";

export async function clientLoader() {
  const storeListPromise = getStoreList();
  return { storeListPromise };
}

function stores() {
  const { storeListPromise } = useLoaderData<typeof clientLoader>();

  const revalidator = useRevalidator();
  const handleSeed = async () => {
    const ok = confirm("確定要重置？");
    if (!ok) return;

    await reset();
    alert("重置成功！");
    revalidator.revalidate(); // 重新抓 loader 資料
  };

  return (
    <div className="space-y-8 ">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 text-2xl font-medium">店家列表</h2>

        {import.meta.env.DEV && (
          <Button
            onClick={handleSeed}
            color="danger"
            variant="text"
            size="small"
          >
            <ClearOutlined />
            重置
          </Button>
        )}
      </div>

      <Suspense fallback={<Loading />}>
        <Await resolve={storeListPromise}>
          {(storeListRes) => <StoreList storeListRes={storeListRes} />}
        </Await>
      </Suspense>
    </div>
  );
}

/* 因為 storeListPromise 要在 Await 後才可以拿到 storeListRes，
而 react 不可以在渲染中(即 return) 時再去執行上面的 js(即 setState)，
所以多建個 react component，將 storeListRes 傳給子 component，
state 的預設值就可以直接放 storeListRes */
function StoreList({ storeListRes }: { storeListRes: StoreListRes }) {
  const [stores, setStores] = useState<Store[]>(storeListRes.page);
  const [continueCursor, setContinueCursor] = useState<string>(
    storeListRes.continueCursor,
  );
  const [isDone, setIsDone] = useState<boolean>(storeListRes.isDone);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStores(storeListRes.page);
    setContinueCursor(storeListRes.continueCursor);
    setIsDone(storeListRes.isDone);
  }, [storeListRes]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    // 監聽兩個元素是否交錯
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreStores();
        }
      },
      {
        rootMargin: "200px", // 提前撈
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [continueCursor, isDone]);

  async function fetchMoreStores() {
    if (loadingMore || isDone || !continueCursor) return;
    setLoadingMore(true);

    try {
      const data = await getStoreList(continueCursor);

      setStores((prev) => [...prev, ...data.page]);
      setContinueCursor(data.continueCursor);
      setIsDone(data.isDone);
    } catch (err) {
      console.error(err);
      throw new Error("取得店家列表資料失敗（非預期錯誤，請聯絡後端");
    } finally {
      setLoadingMore(false);
    }
  }

  if (!stores || stores.length === 0) {
    return <div className="text-center text-gray-400">尚未建立任何店家</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Link to="/stores/new/step-1" className="flex flex-col">
          <Button
            type="dashed"
            className="h-[276px]! rounded-2xl! text-colorTextTertiary! hover:text-colorPrimaryHover!"
          >
            <PlusOutlined className="flex! items-center! justify-center! text-2xl" />
          </Button>
        </Link>

        {stores.map((store) => (
          <StoreCard key={store._id} store={store} />
        ))}
      </div>

      <div ref={loadMoreRef} className="flex items-center justify-center gap-4">
        {loadingMore && stores.length !== 0 && (
          <>
            <Spin></Spin>
            <p className="text-gray-500">載入更多...</p>
          </>
        )}

        {!loadingMore && isDone && <p className="text-gray-500">已載入全部</p>}
      </div>
    </>
  );
}

export default stores;
