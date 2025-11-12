import { create } from "zustand";

type Step1Data = {
  name: string;
  phone: string;
  address: string;
};

type Step2Data = {
  description: string;
  deliveryAvailable: boolean;
  deliveryMinimum?: string | undefined;
};

type StoreFormState = {
  step1Data: Step1Data;
  step2Data: Step2Data;
  setStep1: (data: Step1Data) => void;
  setStep2: (data: Step2Data) => void;
  reset: () => void;
};

export const useStoreForm = create<StoreFormState>((set) => ({
  // step1 的初始值
  step1Data: { name: "", phone: "", address: "" },
  // step2 的初始值
  step2Data: {
    description: "",
    deliveryAvailable: false,
    deliveryMinimum: "",
  },
  // 更新 step1 資料的 function
  setStep1: (data) => set({ step1Data: data }),
  // 更新 step2 資料的 function
  setStep2: (data) => set({ step2Data: data }),
  // 清空 step1 和 step2 資料
  reset: () =>
    set({
      step1Data: { name: "", phone: "", address: "" },
      step2Data: {
        description: "",
        deliveryAvailable: false,
        deliveryMinimum: "",
      },
    }),
}));
