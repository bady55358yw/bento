import { deleteStore } from "@/api/stores/deleteStore";
import type { Store } from "@/api/stores/getStore";
import Ebike from "@/assets/icon-ebike.svg?react";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Link } from "react-router";

type StoreCardProps = {
  store: Store;
  hasAction?: boolean;
};

function StoreCard({ store, hasAction = true }: StoreCardProps) {
  const [modal, contextHolder] = Modal.useModal();

  const handleDelete = () => {
    modal.confirm({
      title: "確定要刪除店家？",
      content: `「${store?.name}」將會被永久刪除，無法復原。`,
      okText: "刪除",
      okType: "danger",
      cancelText: "取消",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const isDeleteSuccessed = await deleteStore(store._id);
        if (isDeleteSuccessed) {
          window.location.reload();
        }
      },
    });
  };

  return (
    <div
      className={`flex flex-col min-w-[260px] w-full ${hasAction === false ? "h-full" : "h-[280px]"} lg:h-[280px] bg-white border border-colorBorder rounded-2xl p-4 gap-y-3`}
    >
      {/* Store Name & Opening Time */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-colorText text-xl font-medium">{store?.name}</h3>

          <div className="flex flex-col">
            {hasAction && (
              <Button
                onClick={handleDelete}
                color="default"
                variant="link"
                className="text-gray-400! text-sm! hover:text-colorPrimaryHover!"
              >
                <CloseOutlined />
              </Button>
            )}

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
      <div className="text-xs space-y-1.5">
        <div className="flex items-center justify-between text-colorTextSecondary">
          <p>{store?.phone}</p>

          <div className="flex items-center">
            <Ebike className="w-4.5 h-4.5 text-colorPrimary/60!" />
            <p className="text-colorText">
              {store.deliveryAvailable && store.deliveryMinimum
                ? `最少 ${store.deliveryMinimum}`
                : "不提供外送"}
            </p>
          </div>
        </div>
        <p className="text-colorTextTertiary">{store?.address}</p>
      </div>

      {/* Action */}
      {hasAction && (
        <div className="flex justify-end gap-2 border-t border-colorBorderSecondary pt-2 w-full">
          {/* Ant Design 的 Modal.useModal() 用 */}
          {contextHolder}
          <Link to={`/stores/edit/${store._id}`}>
            <Button color="cyan" variant="outlined">
              修改
            </Button>
          </Link>

          <Link to={`/stores/${store._id}`}>
            <Button color="primary" variant="outlined">
              管理
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default StoreCard;
