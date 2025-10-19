import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function index() {
  return (
    <div className="space-y-8">
      <h2 className="text-gray-800 text-2xl font-medium">店家列表</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Button type="dashed" className="flex flex-col !h-[276px]">
          <PlusOutlined className="!flex !items-center !justify-center text-lg" />
          <p>新增店家</p>
        </Button>

        <Card className="h-[276px]">
          Card content
        </Card>
        <Card className="h-[276px]">
          Card content
        </Card>
        <Card className="h-[276px]">
          Card content
        </Card>
        <Card className="h-[276px]">
          Card content
        </Card>
        <Card className="h-[276px]">
          Card content
        </Card>
      </div>
    </div>
  );
}

export default index;
