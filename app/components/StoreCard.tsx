import { useNavigate } from "react-router";
import { Tag, Button, Modal } from "antd";
import { type Store } from "@/types/stores";
import Ebike from "@/assets/icon-ebike.svg?react";
import { deleteStore } from "@/api/stores/deleteStore";
import { CloseOutlined,AppstoreAddOutlined } from "@ant-design/icons";

function StoreCard({ store }: { store: Store }) {
  let navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  const handleDelete = () => {
    modal.confirm({
      title: "確定要刪除店家？",
      content: `「${store?.name}」將會被永久刪除，無法復原。`,
      okText: "刪除",
      okType: "danger",
      cancelText: "取消",
      onOk: async () => {
        const isDeleteSuccessed = await deleteStore(store._id);
        if (isDeleteSuccessed) {
          window.location.reload();
        }
      },
    });
  };

  return (
    <div className="flex flex-col h-[280px] bg-white border border-colorBorder rounded-2xl p-4 gap-y-3">
      {/* Store Name & Opening Time */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-colorText text-xl font-medium">
            {store?.name}
          </h3>

          <div className="flex flex-col">
            <Button
              onClick={handleDelete}
              color="default"
              variant="link"
              className="text-gray-400! text-sm! hover:text-colorPrimaryHover!"
            >
              <CloseOutlined />
            </Button>

            {/* <Tag color="default" className="rounded-full!">
              營業中
            </Tag> */}
          </div>
        </div>
        {/* <h6 className="text-colorTextTertiary text-xs">結束營業時間：14:30</h6> */}
      </div>

      {/* Store Description */}
      <div className="flex-1 text-colorTextTertiary h-full text-base">
        {store?.description}
      </div>

      {/* Store Info */}
      <div className="text-xs border-b border-colorBorderSecondary pb-2">
        <div className="flex items-center justify-between text-colorTextSecondary">
          <p>{store?.phone}</p>
          {store?.deliveryMinimum !== 0 ? (
            <div className="flex items-center">
              <Ebike className="w-4.5 h-4.5 text-colorPrimary/60!" />
              <p className="text-colorText">{`最少 ${store?.deliveryMinimum}`}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <p className="text-colorTextTertiary">{store?.address}</p>
      </div>

      {/* Action */}
      <div className="self-end flex gap-2">
        {/* Ant Design 的 Modal.useModal() 用 */}
        {contextHolder}
        <Button
          onClick={() => navigate(`/stores/edit/${store._id}`)}
          color="cyan"
          variant="outlined"
        >
          修改
        </Button>
        <Button
          color="primary"
          variant="outlined"
        >
          管理
        </Button>
      </div>
    </div>
  );
}

export default StoreCard;
