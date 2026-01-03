import { getCategoryList } from "@/api/category/getCategoryList";
import { getProductList } from "@/api/product/getProductList";
import { getStore } from "@/api/stores/getStore";
import CategoryTabs from "@/components/CategoryTabs";
import Loading from "@/components/Loading";
import { WithHeaderEffect } from "@/layouts/BaseLayout/BaseLayout";
import { SwapRightOutlined } from "@ant-design/icons";
import StoreCard from "@components/StoreCard";
import { Button } from "antd";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Await, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/index";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const storePromise = getStore(params.storeId);
  const categoryListPromise = getCategoryList(params.storeId);
  const productListPromise = getProductList(params.storeId);

  return { storePromise, categoryListPromise, productListPromise };
}

function index() {
  const { storePromise } = useLoaderData<typeof clientLoader>();
  const { categoryListPromise } = useLoaderData<typeof clientLoader>();
  const { productListPromise } = useLoaderData<typeof clientLoader>();

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

        <div className="flex-1 flex flex-col lg:flex-row gap-x-8 w-full h-full gap-y-8">
          {/* 店家 */}

          <ErrorBoundary
            fallbackRender={({ error }) => <p>⚠️ {error.message} </p>}
          >
            <Await resolve={storePromise}>
              {(storeData) => (
                <div>
                  <StoreCard store={storeData} hasAction={false} />
                </div>
              )}
            </Await>
          </ErrorBoundary>

          <ErrorBoundary
            fallbackRender={({ error }) => <p>⚠️ {error.message} </p>}
          >
            <Suspense fallback={<Loading />}>
              <Await
                resolve={Promise.all([
                  storePromise,
                  categoryListPromise,
                  productListPromise,
                ])}
              >
                {([storeData, categoryListData, productListData]) => (
                  <div className="flex-1 flex flex-col min-w-0">
                    <CategoryTabs storeId={storeData._id} />
                  </div>
                )}
              </Await>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </WithHeaderEffect>
  );
}

export default index;
