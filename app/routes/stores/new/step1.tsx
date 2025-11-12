import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, Form } from "antd";
const { TextArea } = Input;
import { useStoreForm } from "@/store/useStoreForm";

const step1Schema = z.object({
  name: z.string().min(1, "請輸入店名"),
  phone: z
    .string()
    .min(1, "請輸入電話號碼")
    .regex(/^09\d{8}$/, "請輸入以 09 開頭的 10 碼電話號碼"),
  address: z.string(),
});

type Step1Inputs = z.infer<typeof step1Schema>;

function step1() {
  let navigate = useNavigate();
  const { step1Data, setStep1 } = useStoreForm()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1Inputs>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1Data, // 使用 store 的 step1Data 初始值
  });


  const submitForm = (data: Step1Inputs) => {
    setStep1(data) // 儲存 step1 資料到 store
    navigate("/stores/step-2");
  };

  return (
    <div className="flex flex-col items-center w-full h-full gap-4">
      <h1 className="text-3xl text-colorText my-6">Step 1｜選擇店家</h1>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center justify-between w-full h-full gap-6"
      >
        <div className="flex flex-col gap-y-2 w-full max-w-[540px]">
          <Form.Item
            label="店名"
            validateStatus={errors.name ? "error" : undefined}
            help={errors.name?.message}
            layout="vertical"
            className="w-full"
            required
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </Form.Item>

          <Form.Item
            label="電話"
            validateStatus={errors.phone ? "error" : undefined}
            help={errors.phone?.message}
            layout="vertical"
            className="w-full"
            required
          >
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} size="large" placeholder="e.g. 0912345678" />
              )}
            />
          </Form.Item>

          <Form.Item label="地址" layout="vertical" className="w-full ">
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextArea {...field} rows={3} />}
            />
          </Form.Item>
        </div>

        <div className="flex items-center justify-center gap-x-8 w-full">
          <Button
            onClick={() => navigate("/stores")}
            size="large"
            color="primary"
            variant="outlined"
            className="w-[80px]"
          >
            取消
          </Button>

          <div className="flex gap-x-2">
            <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
            <span className="block w-16 h-1 bg-colorFill"></span>
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

export default step1;
