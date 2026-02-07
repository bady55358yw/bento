import { useState } from "react";
import { Outlet } from "react-router";

type StoreFormData = {
  step1: {
    name: string;
    phone: string;
    address: string;
  };
  step2: {
    description: string;
    deliveryAvailable: boolean;
    deliveryMinimum?: string | undefined;
  };
};

export type StoreNewContextType = [
  StoreFormData, // 步驟一和步驟二資料
  (value: StoreFormData | ((prev: StoreFormData) => StoreFormData)) => void, // 更新步驟一和步驟二資料
  () => void, // 清空步驟一和步驟二資料
];

function newContainer() {
  // formData 用來儲存步驟一和步驟二的資料，以便回一步時不會清掉步驟一和步驟二的資料
  const [formData, setFormData] = useState<StoreFormData>({
    step1: {
      name: "",
      phone: "",
      address: "",
    },
    step2: {
      description: "",
      deliveryAvailable: false,
      deliveryMinimum: "",
    },
  });

  const handleReset = () => {
    setFormData({
      step1: {
        name: "",
        phone: "",
        address: "",
      },
      step2: {
        description: "",
        deliveryAvailable: false,
        deliveryMinimum: "",
      },
    });
  };
  return <Outlet context={[formData, setFormData, handleReset]} />;
}

export default newContainer;
