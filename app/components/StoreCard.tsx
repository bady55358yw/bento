import Ebike from "@/assets/icon-ebike.svg?react";
import { Tag, Button } from "antd";

function StoreCard() {
  return (
    <div className="flex flex-col h-[280px] bg-white border border-colorBorder rounded-lg p-4 gap-y-2">
      {/* Store Name & Opening Time */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-colorText text-2xl font-semibold">午食日常</h3>
          <Tag color="default" className="!rounded-full">營業中</Tag>
        </div>
        <h6 className="text-colorTextTertiary text-xs">結束營業時間：14:30</h6>
      </div>

      {/* Store Description */}
      <div className="flex-1 text-colorTextSecondary h-full text-base">
        強調健康少油的家常菜，每日新鮮供應
      </div>

      {/* Store Info */}
      <div className="text-xs border-b border-colorBorderSecondary pb-2">
        <div className="flex items-center justify-between text-colorTextSecondary">
          <p>02-23911122</p>
          <div className="flex items-center">
            <Ebike className="w-5 h-5" />
            <p>最少 $200</p>
          </div>
        </div>
        <p className="text-colorTextTertiary">台北市中正區信義路一段100號</p>
      </div>

      {/* Action */}
      <div className="self-end flex gap-1">
        <Button color="danger" variant="text">
          刪除
        </Button>
        <Button color="primary" variant="filled" >
          修改
        </Button>
  
      </div>
    </div>
  );
}

export default StoreCard;
