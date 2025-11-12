import { useNavigate, useLoaderData } from "react-router";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StoreCard from "@components/StoreCard";
import { getStoreList } from "@/api/stores";
import { type Store } from "@/types/stores";

export async function clientLoader() {
  const data = await getStoreList();
  return data;
}

function stores() {
  let navigate = useNavigate();

  const storeListData = useLoaderData<typeof clientLoader>();
  console.log(storeListData);

  return (
    <div className="space-y-8 ">
      <h2 className="text-gray-800 text-2xl font-medium">店家列表</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Button
          onClick={() => navigate("/stores/step-1")}
          type="dashed"
          className="flex flex-col !h-[276px]"
        >
          <PlusOutlined className="!flex !items-center !justify-center text-lg" />
          <p>新增店家</p>
        </Button>

        {storeListData?.page?.map((store: Store) => (
          <StoreCard key={store._id} store={store} />
        ))}
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <StoreCard key={index} />
        ))}

        <StoreCard /> */}
      </div>
    </div>
  );
}

export default stores;
