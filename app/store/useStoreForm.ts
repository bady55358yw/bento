import { create } from "zustand";

type Step1Data = {
  storeName: string;
  phoneNumber: string;
  address: string;
};

type Step2Data = {
  storeDescription: string;
  hasDeliveryService: boolean;
  deliveryFee?: string | undefined;
};

type StoreFormState = {
  step1Data: Step1Data;
  step2Data: Step2Data;
  setStep1: (data: Step1Data) => void;
  setStep2: (data: Step2Data) => void;
};

export const useStoreForm = create<StoreFormState>((set) => ({
  // step1 的初始值
  step1Data: { storeName: "", phoneNumber: "", address: "" },
  // step2 的初始值
  step2Data: {
    storeDescription: "",
    hasDeliveryService: false,
    deliveryFee: "",
  },
  // 更新 step1 資料的 function
  setStep1: (data) => set({ step1Data: data }),
  // 更新 step2 資料的 function
  setStep2: (data) => set({ step2Data: data }),
}));
