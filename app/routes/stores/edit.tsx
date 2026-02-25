import { getStore } from "@/api/stores/getStore";
import { updateStore } from "@/api/stores/updateStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link, redirect, useLoaderData, useNavigate } from "react-router";
import * as z from "zod";
import type { Route } from "./+types/edit";
const { TextArea } = Input;

const editSchema = z
  .object({
    name: z.string().min(1, "請輸入店名"),
    phone: z
      .string()
      .min(1, "請輸入電話號碼")
      .regex(/^09\d{8}$/, "請輸入以 09 開頭的 10 碼電話號碼"),
    address: z.string(),
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

type EditInputs = z.infer<typeof editSchema>;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const storeData = await getStore(params.storeId);

  // 先在 loader 就確認 storeData 是否存在，不存在導回店家列表頁
  // => default component 就可以安心處理 UI，因爲傳到 component 一定有資料
  if (!storeData) {
    throw redirect("/stores");
  }

  return { storeData: storeData, storeId: params.storeId };
}

function edit() {
  let navigate = useNavigate();
  const { storeData, storeId } = useLoaderData<typeof clientLoader>();

  const filterStoreData = {
    address: storeData.address,
    deliveryAvailable: storeData.deliveryAvailable,
    deliveryMinimum: String(storeData.deliveryMinimum ?? ""),
    description: storeData.description,
    name: storeData.name,
    phone: String(storeData.phone ?? ""),
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInputs>({
    resolver: zodResolver(editSchema),
    defaultValues: filterStoreData,
  });

  const submitForm = async (data: EditInputs) => {
    // 組合要給後端的資料
    const payload = {
      name: data.name,
      description: data.description,
      phone: data.phone,
      address: data.address,
      deliveryAvailable: data.deliveryAvailable,
      deliveryMinimum: Number(data.deliveryMinimum) || 0,
      deliveryFee: 0,
    };

    const isEditSuccessed = await updateStore(storeId, payload);

    if (isEditSuccessed) {
      navigate("/stores");
    }
  };

  return (
    <div className="flex flex-col items-center w-full md:h-full gap-4">
      <h1 className="text-3xl text-colorText my-6">修改店家資料</h1>

      <form
        action=""
        className="flex flex-col items-center justify-between w-full h-full gap-6"
      >
        <div className="flex flex-col gap-y-2 w-full max-w-[640px]">
          <div className="flex flex-col md:flex-row justify-between w-full gap-y-8">
            <h2 className="w-[260px] text-3xl md:text-4xl text-colorTextQuaternary font-semibold">
              基本
            </h2>

            <div className="flex-1 text-colorTextSecondary">
              <Form.Item
                label="店名"
                validateStatus={errors.name ? "error" : undefined}
                help={errors.name?.message}
                layout="horizontal"
                className="w-full"
                colon={false}
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
                layout="horizontal"
                className="w-full"
                colon={false}
                required
              >
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="e.g. 0912345678"
                    />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="地址"
                layout="horizontal"
                className="w-full"
                colon={false}
                required
              >
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <TextArea {...field} rows={3} />}
                />
              </Form.Item>
            </div>
          </div>

          <span className="block w-full border-b border-colorBorder my-4"></span>

          <div className="flex flex-col md:flex-row justify-between w-full gap-y-8">
            <h2 className="w-[260px] text-3xl md:text-4xl text-colorTextQuaternary font-semibold">
              其他
            </h2>

            <div className="flex-1 space-y-8 text-colorTextSecondary">
              <Form.Item
                label="店家描述"
                layout="horizontal"
                className="w-full"
                colon={false}
              >
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextArea {...field} rows={4} maxLength={120} showCount />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="外送服務"
                validateStatus={errors.deliveryMinimum ? "error" : undefined}
                help={errors.deliveryMinimum?.message}
                layout="horizontal"
                className="w-full [&_.ant-form-item-row]:flex [&_.ant-form-item-row]:items-baseline"
                colon={false}
              >
                <div className="flex items-center text-colorTextSecondary">
                  <Controller
                    name="deliveryAvailable"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="checkbox-lg"
                      >
                        是，外送低消
                      </Checkbox>
                    )}
                  />

                  <Controller
                    name="deliveryMinimum"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        className="flex-1 max-w-28! mr-2!"
                      />
                    )}
                  />
                </div>
              </Form.Item>
            </div>
          </div>
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

          <Button
            onClick={handleSubmit(submitForm)}
            size="large"
            color="primary"
            variant="solid"
            className="w-[80px]"
          >
            修改
          </Button>
        </div>
      </form>
    </div>
  );
}

export default edit;
