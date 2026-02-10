import {
  step1Schema,
  type Step1Values,
  type StoreNewContextType,
} from "@/routes/stores/new/newContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router";
const { TextArea } = Input;

const step1InitialValues: Step1Values = {
  name: "",
  phone: "",
  address: "",
};

function step1() {
  let navigate = useNavigate();
  const { step1, setStep1 } = useOutletContext<StoreNewContextType>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: step1 ?? step1InitialValues,
  });

  const submitForm = (data: Step1Values) => {
    setStep1(data); // 將步驟一資料存到父組件 newContainer
    navigate("/stores/new/step-2");
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
          <Link to="/stores">
            <Button
              size="large"
              color="primary"
              variant="outlined"
              className="w-[80px]"
            >
              取消
            </Button>
          </Link>

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
