import { Button } from "antd";
import { useNavigate, Link } from "react-router";
import { useStoreForm } from "@/store/useStoreForm";
import { createStore } from "@/api/stores/createStore";
import { useContext, useEffect } from "react";
import { HeaderContext } from "@/layouts/HeaderContext";

function step3() {
  let navigate = useNavigate();
  const { step1Data, step2Data, reset } = useStoreForm();
  const { setHeaderMode } = useContext(HeaderContext);

  // 設置不顯示 Header
  useEffect(() => {
    setHeaderMode("none");
  }, []);

  const submitForm = async () => {
    // 組合要給後端的資料
    const payload = {
      ...step1Data,
      ...step2Data,
      deliveryMinimum: Number(step2Data.deliveryMinimum) || 0,
      deliveryFee: 0,
    };

    const data = await createStore(payload);

    if (data) {
      reset(); // 清空所有表單資料
      navigate("/stores");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8">
      <div className="flex flex-col items-center w-full gap-6">
        <h1 className="text-3xl text-colorText my-6">Step ３｜核對資料</h1>

        <div className="flex flex-col gap-y-8 w-full max-w-[640px]">
          <div className="flex justify-between items-start w-full">
            <h2 className="w-[260px] text-4xl text-colorTextQuaternary font-semibold">
              基本
            </h2>

            <div className="flex-1 space-y-8 text-colorTextSecondary">
              <div className="flex items-baseline ">
                <p className="w-32">店名</p>
                <p className="flex-1">{step1Data.name}</p>
              </div>
              <div className="flex items-baseline">
                <p className="w-32">電話</p>
                <p className="flex-1">{step1Data.phone}</p>
              </div>
              <div className="flex items-baseline">
                <p className="w-32">地址</p>
                <p className="flex-1">{step1Data.address}</p>
              </div>
            </div>
          </div>

          <span className="block w-full border-b border-colorBorder my-4"></span>

          <div className="flex justify-between items-start w-full">
            <h2 className="w-[260px] text-4xl text-colorTextQuaternary font-semibold">
              其他
            </h2>

            <div className="flex-1 space-y-8 text-colorTextSecondary">
              <div className="flex items-baseline ">
                <p className="w-32">店家描述</p>
                <p className="flex-1">{step2Data.description}</p>
              </div>
              <div className="flex items-baseline">
                <p className="w-32">外送服務</p>
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

      <div className="flex items-center justify-center gap-x-8 w-full">
        <Link to="/stores/new/step-2">
          <Button size="large" color="primary" variant="outlined">
            上一步
          </Button>
        </Link>

        <div className="flex gap-x-2">
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
    </div>
  );
}

export default step3;
