import { useState } from "react";
import { Outlet } from "react-router";
import * as z from "zod";

export const step1Schema = z.object({
  name: z.string().min(1, "請輸入店名"),
  phone: z
    .string()
    .min(1, "請輸入電話號碼")
    .regex(/^09\d{8}$/, "請輸入以 09 開頭的 10 碼電話號碼"),
  address: z.string(),
});
export type Step1Values = z.input<typeof step1Schema>;

export const step2Schema = z
  .object({
    description: z.string(),
    deliveryAvailable: z.boolean(),
    deliveryMinimum: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.deliveryAvailable &&
      (!data.deliveryMinimum || isNaN(Number(data.deliveryMinimum)))
    ) {
      ctx.addIssue({
        code: "custom",
        message: "外送低消請輸入數字",
        path: ["deliveryMinimum"],
      });
    }
  });
export type Step2Values = z.infer<typeof step2Schema>;


export type StoreNewContextType = {
  // 狀態分開來，在使用時會比較容易分辨
  // 用 null 來表示使用者尚未輸入資料
  step1: Step1Values | null;
  step2: Step2Values | null;
  // setter 不允許 null，不存在這種情境
  setStep1: (value: Step1Values) => void;
  setStep2: (value: Step2Values) => void;
  // 不需要 reset，因為離開這個流程的時候 newContainer 會被 unmount，狀態就已經被清空了
};

function newContainer() {
  const [step1, setStep1] = useState<Step1Values | null>(null);
  const [step2, setStep2] = useState<Step2Values | null>(null);

  return <Outlet context={{ step1, step2, setStep1, setStep2 }} />;
}

export default newContainer;
