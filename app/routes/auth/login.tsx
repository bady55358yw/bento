import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { error: "必填" })
    .min(3, { error: "怎麼可能只有3個字" }),
  password: z
    .string()
    .min(1, { error: "必填" })
    .min(3, { error: "怎麼可能只有3個字" }),
});

// Antd 本就內建 Form 相關元件及表單處理邏輯，但總之我們用 react-hook-form
// Antd 元件只做樣式使用，主要表單邏輯靠 react-hook-form 處理

function login() {
  let navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    // react-hook-form 建議所有欄位都應該有初始值 https://react-hook-form.com/docs/useform#defaultValues
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-3xl text-gray-800 font-medium">超級帳號</h1>

      <div className="mt-6"></div>

      {serverError && <Alert message={serverError} type="error" />}

      <Form
        onFinish={handleSubmit(
          async (values) => {
            console.log("ready to login", values);
            const res = await loginApi(values);
            if (!res.success) {
              setServerError(res.message);
              return;
            }
            await navigate("/stores");
          },
          (err) => console.log("form error", err)
        )}
        layout="vertical"
        className="max-w-[360px]"
      >
        {/* react-hook-form 有兩種方式整合 input，但 Controller 方便很多所以尤為常見 */}
        <Controller
          control={control}
          name="username"
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <Form.Item
              {...field}
              label="帳號"
              // 讓 help 變紅色
              validateStatus={error ? "error" : undefined}
              help={error?.message}
            >
              <Input
                // 這個欄位有錯誤的時候 react-hook-form 會透過 ref 自動 focus 到這個欄位
                ref={ref}
                size="large"
                placeholder="請輸入特別帳號..."
                // 經觀察，要靠設定 Input 的 status 才能即時顯示錯誤的紅色框框
                status={error ? "error" : undefined}
              />
            </Form.Item>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <Form.Item
              {...field}
              label="密碼"
              validateStatus={error ? "error" : undefined}
              help={error?.message}
            >
              <Input.Password
                ref={ref}
                size="large"
                placeholder="請輸入密碼..."
                status={error ? "error" : undefined}
              />
            </Form.Item>
          )}
        />

        <Form.Item>
          <Button
            // 這個 button 的 type 是 submit，所以會觸發 form 的 onFinish
            htmlType="submit"
            color="primary"
            variant="solid"
            // 用以阻擋重複送出
            disabled={isSubmitting}
          >
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default login;

// 模擬打 api，這邊實際上是打到 action
async function loginApi({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 實際打 api 大概長這樣
  // const res = await fetch("/api/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ username, password }),
  // });

  // 模擬 api 的行為，基本上你只能從 api 文件看出後端會回傳什麼格式
  const res = (() => {
    if (username !== "admin" || password !== "123456") {
      return new Response(
        JSON.stringify({ success: false, message: "帳號或密碼錯誤" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "登入成功" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  })();

  // 因為前端程式不會知道 api 的回傳格式，所以自己先定義好
  return (await res.json()) as { success: boolean; message: string };
}
