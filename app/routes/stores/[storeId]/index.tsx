import { SwapRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/index";
import { getCategoryList } from "@/api/category/getCategoryList";
import { getProductList } from "@/api/product/getProductList";
import { getStore } from "@/api/stores/getStore";
import CategoryTabs from "@/components/CategoryTabs";
import Loading from "@/components/Loading";
import { WithHeaderEffect } from "@/layouts/BaseLayout/BaseLayout";
import StoreCard from "@components/StoreCard";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const promiseDatas = Promise.all([
    getStore(params.storeId),
    getCategoryList(params.storeId),
    getProductList(params.storeId),
  ]);

  return { promiseDatas };
}

function index() {
  const { promiseDatas } = useLoaderData<typeof clientLoader>();

  return (
    <WithHeaderEffect mode="none">
      <div className="flex flex-col gap-y-8 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800 text-2xl font-medium">店家管理</h2>
          <Link to="/stores">
            <Button color="default" variant="text" className="text-gray-500!">
              返回店家列表
              <SwapRightOutlined />
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Loading />}>
          <Await resolve={promiseDatas}>
            {([storeData, categoryListData, productListData]) => (
              <div className="flex-1 flex flex-col lg:flex-row gap-x-8 w-full h-full gap-y-8">
                <div>
                  {storeData ? (
                    <StoreCard store={storeData} hasAction={false} />
                  ) : (
                    "無法取得店家資料"
                  )}
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                  {/* 類別 */}
                  {storeData && categoryListData ? (
                    <CategoryTabs storeId={storeData._id} />
                  ) : (
                    "無法取得類別資料"
                  )}
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </WithHeaderEffect>
  );
}

export default index;
