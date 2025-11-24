import { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/index";
import { Button } from "antd";
import { PlusOutlined, SwapRightOutlined } from "@ant-design/icons";

import { getCategoryList } from "@/api/category/getCategoryList";
import { getStore } from "@/api/stores/getStore";
import { HeaderContext } from "@/layouts/HeaderContext";
import Category from "@components/Category";
import StoreCard from "@components/StoreCard";
import ProductCard from '@components/ProductCard'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const categoryData = await getCategoryList(params.storeId);
  const storeData = await getStore(params.storeId);
  return { storeData, categoryData };
}

function index() {
  const { storeData, categoryData } = useLoaderData<typeof clientLoader>();
  const { setHeaderMode } = useContext(HeaderContext);

  // 設置不顯示 Header
  useEffect(() => {
    setHeaderMode("none");
  }, []);

  return (
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
        <div>
          <StoreCard store={storeData} hasAction={false} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* 類別 */}
          <Category storeId={storeData._id} categoryData={categoryData} />

          {/* 商品 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-2">
            <Button
              type="dashed"
              className="h-[200px]! min-w-[142px] rounded-xl! text-colorTextTertiary! hover:text-colorPrimaryHover!"
            >
              <PlusOutlined className="flex! items-center! justify-center! text-2xl" />
            </Button>

            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
