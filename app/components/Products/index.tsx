import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, Checkbox } from "antd";
import ProductCard from "./ProductCard";
import { useLoaderData, useRevalidator } from "react-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Products } from "@/api/product/getProductList";
import { createProduct } from "@/api/product/createProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextArea from "antd/es/input/TextArea";

type ProductsProps = {
  categoryId: string;
  storeId: string;
};

const createProductSchema = z.object({
  name: z.string().min(1, "請輸入商品名稱"),
  price: z
    .string()
    .min(1, "請輸入金額")
    .regex(/^[0-9]+$/, "請輸入數字"),
  notes: z.string().optional(),
  isVegetarian: z.boolean(),
});

type CreateInputs = z.infer<typeof createProductSchema>;

function index({ categoryId, storeId }: ProductsProps) {
  const { productListData }: { productListData: Products } = useLoaderData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const revalidator = useRevalidator();

  // 篩選出對應該類別的所有商品
  const matchProducts = productListData.products.filter(
    (p) => p.categoryId === categoryId
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateInputs>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: "0",
      notes: "",
      isVegetarian: false,
    },
  });

  const submitForm = async (data: CreateInputs) => {
    // 組合要給後端的資料
    const payload = {
      categoryId: categoryId,
      name: data.name,
      price: Number(data.price),
      notes: data.notes || "",
      isVegetarian: data.isVegetarian,
    };

    const isCreateProduct = await createProduct(storeId, payload);

    if (isCreateProduct) {
      reset(); // 清空表單
      setIsAddModalOpen(false);
      revalidator.revalidate();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-2">
      <Button
        onClick={() => setIsAddModalOpen(true)}
        type="dashed"
        className="h-[220px]! min-w-[142px] rounded-xl! text-colorTextTertiary! hover:text-colorPrimaryHover!"
      >
        <PlusOutlined className="flex! items-center! justify-center! text-2xl" />
      </Button>
      {matchProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* 新增商品的彈窗 */}
      <Modal
        open={isAddModalOpen}
        title="新增商品"
        onOk={handleSubmit(submitForm)}
        onCancel={() => setIsAddModalOpen(false)}
        okText="新增"
        cancelText="取消"
      >
        <Form layout="horizontal" labelCol={{ span: 5 }}>
          <Form.Item
            label="商品名稱"
            validateStatus={errors.name ? "error" : undefined}
            help={errors.name?.message}
            className="w-full"
            required
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="金額"
            validateStatus={errors.price ? "error" : undefined}
            help={errors.price?.message}
            required
          >
            <Controller
              name="price"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item label="可素食">
            <Controller
              name="isVegetarian"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="checkbox-lg"
                />
              )}
            />
          </Form.Item>

          <Form.Item label="備註">
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextArea {...field} rows={4} maxLength={120} showCount />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default index;
