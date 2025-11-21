import { getCategoryList } from "@/api/category/getCategoryList";
import { getStore } from "@/api/stores/getStore";
import { SwapLeftOutlined } from "@ant-design/icons";
import Category from "@components/Category";
import StoreCard from "@components/StoreCard";
import { Button } from "antd";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/index";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const categoryData = await getCategoryList(params.storeId);
  const storeData = await getStore(params.storeId);
  return { storeData, categoryData };
}

function index() {
  const { storeData, categoryData } = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col gap-y-8 h-full">
      <h2 className="text-gray-800 text-2xl font-medium">店家管理</h2>

      <div className="flex-1 flex gap-x-8 w-full h-full">
        <div className="flex flex-col justify-between items-start">
          <StoreCard store={storeData} />
          <Link to="/stores">
            <Button color="default" variant="text" className="text-gray-500!">
              <SwapLeftOutlined />
              返回店家列表
            </Button>
          </Link>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* 類別 */}
          <Category storeId={storeData._id} categoryData={categoryData} />

          {/* 商品 */}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default index;
