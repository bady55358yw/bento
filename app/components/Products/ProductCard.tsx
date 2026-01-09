import productImage01 from "@/assets/product-01.png";
import IconLeaf from "@/assets/icon-leaf.svg?react";
import type { Product } from "@/api/product/getProduct";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct } from "@/api/product/updateProduct";
import { useRevalidator } from "react-router";
import { deleteProduct } from "@/api/product/deleteProduct";

type ProductCardProps = {
  storeId: string;
  product: Product;
};

const editProductSchema = z.object({
  name: z.string().min(1, "請輸入商品名稱"),
  price: z
    .string()
    .min(1, "請輸入金額")
    .regex(/^[0-9]+$/, "請輸入數字"),
  notes: z.string().optional(),
  isVegetarian: z.boolean(),
});

type EditInputs = z.infer<typeof editProductSchema>;

function ProductCard({ storeId, product }: ProductCardProps) {
  const revalidator = useRevalidator();

  // modal 控制
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Ant Design 的 Modal.useModal() 用
  const [modal, contextHolder] = Modal.useModal();

  // 表單控制（react-hook-form）
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditInputs>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name,
      price: String(product.price),
      notes: product.notes,
      isVegetarian: product.isVegetarian,
    },
  });

  /*  === 處理「修改商品功能」 ===  */
  const handleEditProduct = async (data: EditInputs) => {
    // 組合要給後端的資料
    const payload = {
      categoryId: product.categoryId,
      name: data.name,
      price: Number(data.price),
      notes: data.notes || "",
      isVegetarian: data.isVegetarian,
    };

    const isEditProduct = await updateProduct(storeId, product.id, payload);

    if (isEditProduct) {
      reset(); // 清空表單
      setIsEditModalOpen(false);
      revalidator.revalidate();
    }
  };

  /*  === 處理「刪除商品功能」 ===  */
  const handleDeleteProduct = async () => {
    modal.confirm({
      title: "確定要刪除商品？",
      content: `「${product.name}」將會被永久刪除，無法復原。`,
      okText: "刪除",
      okType: "danger",
      cancelText: "取消",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const isDeleteProductSuccessed = await deleteProduct(
          storeId,
          product.id
        );

        if (isDeleteProductSuccessed) {
          revalidator.revalidate();
        }
      },
    });
  };

  return (
    <>
      <div className="flex flex-col min-w-[142px] w-full h-[220px] drop-shadow-sm">
        <div className="relative flex-1 w-full h-full overflow-hidden rounded-t-xl bg-colorBgLayout">
          {/* icon-vegetarian */}
          {product.isVegetarian && (
            <div className="absolute flex items-center justify-center w-8 h-8 bg-colorSuccess/70 top-0 left-0 rounded-tl-xl rounded-br-xl text-sm font-semibold">
              <IconLeaf className="text-white w-5 h-5" />
            </div>
          )}

          {/* action-edit */}
          <div className="absolute flex items-center justify-center w-8 h-8 bg-white/80 bottom-2 right-12 rounded-full text-sm font-semibold">
            <Button
              onClick={() => setIsEditModalOpen(true)}
              type="primary"
              icon={<EditOutlined />}
              shape="circle"
              className="bg-white/10! text-colorTextSecondary!"
            />
          </div>

          {/* action-delete */}
          <div className="absolute flex items-center justify-center w-8 h-8 bg-white/80 bottom-2 right-2 rounded-full text-sm font-semibold">
            <Button
              onClick={handleDeleteProduct}
              type="primary"
              icon={<DeleteOutlined />}
              shape="circle"
              className="bg-white/10! text-colorError!"
            />
          </div>

          {/* image */}
          <img
            src={productImage01}
            alt="商品圖片"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="px-4 py-1.5 w-full bg-white rounded-b-xl text-center">
          {/* name */}
          <p className="truncate text-base  text-colorTextSecondary">
            {product.name}
          </p>
          {/* price */}
          <p className="text-colorText text-sm font-semibold">
            ${new Intl.NumberFormat("zh-TW").format(product.price)}
          </p>
        </div>
      </div>

      {/* 修改商品的彈窗 */}
      <Modal
        open={isEditModalOpen}
        title="修改商品"
        onOk={handleSubmit(handleEditProduct)}
        onCancel={() => setIsEditModalOpen(false)}
        okText="修改"
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

      {/* 確認刪除商品的對話框（Ant Design 的 Modal.useModal() 用） */}
      {contextHolder}
    </>
  );
}

export default ProductCard;
