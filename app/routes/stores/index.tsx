import { reset } from "@/api/reset";
import { getStoreList } from "@/api/stores/getStoreList";
import Loading from "@/components/Loading";
import { WithHeaderEffect } from "@/layouts/BaseLayout/BaseLayout";
import { ClearOutlined, PlusOutlined } from "@ant-design/icons";
import StoreCard from "@components/StoreCard";
import { Button } from "antd";
import { Suspense } from "react";
import { Await, Link, useLoaderData, useRevalidator } from "react-router";

export async function clientLoader() {
  const storeListData = getStoreList();
  return { storeListData };
}

function stores() {
  const { storeListData } = useLoaderData<typeof clientLoader>();

  const revalidator = useRevalidator();
  const handleSeed = async () => {
    const ok = confirm("確定要重置？");
    if (!ok) return;

    await reset();
    alert("重置成功！");
    revalidator.revalidate(); // 重新抓 loader 資料
  };

  return (
    <WithHeaderEffect mode="full">
      <div className="space-y-8 ">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800 text-2xl font-medium">店家列表</h2>
          <Button
            onClick={handleSeed}
            color="danger"
            variant="text"
            size="small"
          >
            <ClearOutlined />
            重置
          </Button>
        </div>

        <Suspense fallback={<Loading />}>
          <Await resolve={storeListData}>
            {(storeListData) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <Link to="/stores/new/step-1" className="flex flex-col">
                  <Button
                    type="dashed"
                    className="h-[276px]! rounded-2xl! text-colorTextTertiary! hover:text-colorPrimaryHover!"
                  >
                    <PlusOutlined className="flex! items-center! justify-center! text-2xl" />
                  </Button>
                </Link>

                {storeListData?.page?.map((store) => (
                  <StoreCard key={store._id} store={store} />
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </WithHeaderEffect>
  );
}

export default stores;
