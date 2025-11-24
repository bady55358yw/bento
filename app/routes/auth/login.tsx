import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "antd";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";
import { HeaderContext } from "@/layouts/HeaderContext";

const loginSchema = z.object({
  account: z.string().min(1, "請輸入帳號").min(3, "帳號需至少 3 個字元"),
  password: z.string().min(1, "請輸入密碼").min(6, "密碼需至少 6 個字元"),
});

type Inputs = z.infer<typeof loginSchema>;

function login() {
  let navigate = useNavigate();
  const { setHeaderMode } = useContext(HeaderContext);

  // 設置顯示 Header-withoutLogin
  useEffect(() => {
    setHeaderMode("withoutLogin");
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { account: "", password: "" },
  });

  const onSubmit = (data: Inputs) => {
    navigate("/stores");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 h-full">
      <h1 className="text-3xl text-gray-800 font-medium">超級帳號</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-[280px]"
      >
        <Form.Item
          label="帳號"
          validateStatus={errors.account ? "error" : undefined}
          help={errors.account?.message}
          layout="vertical"
          className="w-full "
        >
          <Controller
            name="account"
            control={control}
            rules={{ required: true }}
            render={({ field: { ...field } }) => (
              <Input {...field} size="large" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="密碼"
          validateStatus={errors.password ? "error" : undefined}
          help={errors.password?.message}
          layout="vertical"
          className="w-full"
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} size="large" />}
          />
        </Form.Item>

        <Button htmlType="submit" color="primary" variant="solid">
          登入
        </Button>
      </form>
    </div>
  );
}

export default login;
