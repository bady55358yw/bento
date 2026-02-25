import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router";

function AddStoreButton() {
  return (
    <Link to="/stores/new/step-1" className="flex flex-col">
      <Button
        type="dashed"
        className="h-[276px]! rounded-2xl! text-colorTextTertiary! hover:text-colorPrimaryHover!"
      >
        <PlusOutlined className="flex! items-center! justify-center! text-2xl" />
      </Button>
    </Link>
  );
}

export default AddStoreButton;