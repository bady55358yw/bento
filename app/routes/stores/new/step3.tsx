import { createStore } from "@/api/stores/createStore";
import type { StoreNewContextType } from "@/routes/stores/new/newContainer";
import { Button } from "antd";
import { Link, Navigate, useNavigate, useOutletContext } from "react-router";

function step3() {
  let navigate = useNavigate();
  const { step1Data, step2Data } = useOutletContext<StoreNewContextType>();

  // 防止不正常操作，不可以用 navigate，因為 navigate 是在 render 時做狀態更新，所以要改用 Navigate Component
  if (!step1Data) return <Navigate to="/stores/new/step-1" />;
  if (!step2Data) return <Navigate to="/stores/new/step-2" />;

  const submitForm = async () => {
    // 組合要給後端的資料
    const payload = {
      ...step1Data,
      ...step2Data,
      deliveryMinimum: Number(step2Data?.deliveryMinimum) || 0,
      deliveryFee: 0,
    };

    const data = await createStore(payload);

    if (data) {
      navigate("/stores");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full md:h-full gap-8">
      <div className="flex flex-col items-center w-full gap-6">
        <h1 className="text-3xl text-colorText my-6">Step ３｜核對資料</h1>

        <div className="flex flex-col gap-y-8 w-full max-w-[640px]">
          <div className="flex flex-col md:flex-row justify-between w-full gap-y-8">
            <h2 className="w-[260px] text-3xl md:text-4xl text-colorTextQuaternary font-semibold">
              基本
            </h2>

            <div className="flex-1 space-y-8 text-colorTextSecondary">
              <div className="flex items-baseline ">
                <p className="w-24">店名</p>
                <p className="flex-1">{step1Data.name}</p>
              </div>
              <div className="flex items-baseline">
                <p className="w-24">電話</p>
                <p className="flex-1">{step1Data.phone}</p>
              </div>
              <div className="flex items-baseline">
                <p className="w-24">地址</p>
                <p className="flex-1">{step1Data.address}</p>
              </div>
            </div>
          </div>

          <span className="block w-full border-b border-colorBorder my-4"></span>

          <div className="flex flex-col md:flex-row justify-between w-ful gap-y-8">
            <h2 className="w-[260px] text-3xl md:text-4xl text-colorTextQuaternary font-semibold">
              其他
            </h2>

            <div className="flex-1 space-y-8 text-colorTextSecondary">
              <div className="flex items-baseline ">
                <p className="w-24">店家描述</p>
                <p className="flex-1">{step2Data.description}</p>
              </div>
              <div className="flex items-baseline">
                <p className="w-24">外送服務</p>
                <p className="flex-1">
                  {step2Data.deliveryAvailable
                    ? `是 / 外送低消 ${step2Data.deliveryMinimum}`
                    : "否"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-x-8 w-full">
          <Link to="/stores/new/step-2">
            <Button size="large" color="primary" variant="outlined">
              上一步
            </Button>
          </Link>

          <div className="hidden sm:flex gap-x-2">
            <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
            <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
            <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
          </div>

          <Button
            onClick={submitForm}
            size="large"
            color="primary"
            variant="solid"
            className="w-[80px]"
          >
            新增
          </Button>
        </div>

        <div>
          <Link to="/stores">
            <Button size="large" color="primary" variant="link">
              取消?
            </Button>
          </Link>
          <span className="text-colorTextTertiary">回店家列表</span>
        </div>
      </div>
    </div>
  );
}

export default step3;
