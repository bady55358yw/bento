import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button, Checkbox, Form, Input } from "antd";
const { TextArea } = Input;
import { useStoreForm } from "@/store/useStoreForm";

const step2Schema = z
  .object({
    storeDescription: z.string(),
    hasDeliveryService: z.boolean(),
    deliveryFee: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.hasDeliveryService &&
      (!data.deliveryFee || isNaN(Number(data.deliveryFee)))
    ) {
      ctx.addIssue({
        code: "custom",
        message: "外送低消請輸入數字",
        path: ["deliveryFee"],
      });
    }
  });

type Step2Inputs = z.infer<typeof step2Schema>;

function step2() {
  let navigate = useNavigate();
  const { step2Data, setStep2 } = useStoreForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Inputs>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2Data, // 使用 store 的 step2Data 初始值
  });

  const submitForm = (data: Step2Inputs) => {
    setStep2(data); // 儲存 step2 資料到 store
    navigate("/stores/step-3");
  };

  return (
    <div className="flex flex-col items-center w-full h-full gap-4">
      <h1 className="text-3xl text-colorText my-6">Step 2｜店家資料</h1>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center justify-between w-full h-full gap-6"
      >
        <div className="flex flex-col gap-y-8 w-full max-w-[640px]">
          <Form.Item label="店家描述" layout="vertical" className="w-full">
            <Controller
              name="storeDescription"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea {...field} rows={4} maxLength={120} showCount />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.deliveryFee ? "error" : ""}
            help={errors.deliveryFee?.message}
          >
            <div className="flex items-center text-colorTextSecondary">
              <Controller
                name="hasDeliveryService"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="checkbox-lg !text-colorTextSecondary !text-base"
                  >
                    提供外送服務，外送低消：
                  </Checkbox>
                )}
              />

              <Controller
                name="deliveryFee"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    className="flex-1 !max-w-28 !mr-2"
                  />
                )}
              />
            </div>
          </Form.Item>
        </div>

        <div className="flex items-center justify-center gap-x-8 w-full">
          <Button
            onClick={() => navigate("/stores/step-1")}
            size="large"
            color="primary"
            variant="outlined"
          >
            上一步
          </Button>

          <div className="flex gap-x-2">
            <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
            <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
            <span className="block w-16 h-1 bg-colorFill"></span>
          </div>

          <Button
            htmlType="submit"
            size="large"
            color="primary"
            variant="solid"
          >
            下一步
          </Button>
        </div>
      </form>
    </div>
  );
}

export default step2;
