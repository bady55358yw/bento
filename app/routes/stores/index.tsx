import { getStoreList } from "@/api/stores/getStoreList";
import { type Store } from "@/types/stores";
import { PlusOutlined } from "@ant-design/icons";
import StoreCard from "@components/StoreCard";
import { Button } from "antd";
import { useLoaderData, Link } from "react-router";

export async function clientLoader() {
  const data = await getStoreList();
  return data;
}

function stores() {
  const storeListData = useLoaderData<typeof clientLoader>();

  return (
    <div className="space-y-8 ">
      <h2 className="text-gray-800 text-2xl font-medium">店家列表</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Link to="/stores/new/step-1">
          <Button
            type="dashed"
            className="flex flex-col h-[276px]! rounded-2xl! text-colorTextTertiary! hover:text-colorPrimaryHover!"
          >
            <PlusOutlined className="flex! items-center! justify-center! text-2xl" />
          </Button>
        </Link>

        {storeListData?.page?.map((store: Store) => (
          <StoreCard key={store._id} store={store} />
        ))}
      </div>
    </div>
  );
}

export default stores;
