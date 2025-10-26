import { Button, Input,Checkbox } from "antd";
import { useNavigate } from "react-router";
const { TextArea } = Input;

function step3() {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8">
      <div className="flex flex-col items-center w-full gap-6">
        <h1 className="text-3xl text-colorText my-6">Step ３｜核對資料</h1>

        <div className="flex flex-col gap-y-8 w-full max-w-[640px]">
            <div className="flex justify-between items-start w-full">
                <h2 className="w-[260px] text-4xl text-colorTextQuaternary font-semibold">基本</h2>

                <div className="flex-1 space-y-8 text-colorTextSecondary">
                    <div className="flex items-baseline ">
                        <p className="w-32">店名</p>
                        <p className="flex-1">午食日常</p>
                    </div>
                    <div className="flex items-baseline">
                        <p className="w-32">電話</p>
                        <p className="flex-1">02-23911122</p>
                    </div>
                    <div className="flex items-baseline">
                        <p className="w-32">地址</p>
                        <p className="flex-1">台北市中正區信義路一段100號</p>
                    </div>
                </div>
            </div>

            <span className="block w-full border-b border-colorBorder my-4"></span>

            <div className="flex justify-between items-start w-full">
                <h2 className="w-[260px] text-4xl text-colorTextQuaternary font-semibold">其他</h2>

                <div className="flex-1 space-y-8 text-colorTextSecondary">
                    <div className="flex items-baseline ">
                        <p className="w-32">店家描述</p>
                        <p className="flex-1">強調健康少油的家常菜，每日新鮮供應</p>
                    </div>
                    <div className="flex items-baseline">
                        <p className="w-32">提供外送服務</p>
                        <p className="flex-1">是 / 外送低消 200</p>
                    </div>
                </div>
            </div>
        </div>

      </div>

      <div className="flex items-center justify-center gap-x-8 w-full">
        <Button
          onClick={() => navigate("/stores/step-2")}
          size="large"
          color="primary"
          variant="outlined"
        >
          上一步
        </Button>

        <div className="flex gap-x-2">
          <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
          <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
          <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
        </div>

        <Button onClick={() => navigate("/stores")} size="large" color="primary" variant="solid" className="w-[80px]">
          新增
        </Button>
      </div>
    </div>
  );
}

export default step3;
