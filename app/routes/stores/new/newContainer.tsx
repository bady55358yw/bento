import { useState } from "react";
import { Outlet } from "react-router";
import z from "zod";

export const step1Schema = z.object({
  name: z.string().min(1, "請輸入店名"),
  phone: z
    .string()
    .min(1, "請輸入電話號碼")
    .regex(/^09\d{8}$/, "請輸入以 09 開頭的 10 碼電話號碼"),
  address: z.string(),
});

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

export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;

export type StoreNewContextType = {
  step1Data: Step1Values| null;
  setStep1Data: (value: Step1Values) => void;
  step2Data: Step2Values| null;
  setStep2Data: (value: Step2Values) => void;
};

function newContainer() {
  // 用來儲存步驟一和步驟二的資料，以便回一步時不會清掉步驟一和步驟二的資料
  const [step1Data, setStep1Data] = useState<Step1Values | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Values | null>(null);
  return (
    <Outlet context={{ step1Data, setStep1Data, step2Data, setStep2Data }} />
  );
}

export default newContainer;
