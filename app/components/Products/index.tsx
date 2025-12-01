import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, Checkbox } from "antd";
import ProductCard from "./ProductCard";
import type { Products } from "@/types/product";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { Controller } from "react-hook-form";

type ProductsProps = {
  categoryId: string;
};

function index({ categoryId }: ProductsProps) {
  const { productListData }: { productListData: Products } = useLoaderData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filterProducts = productListData.products.filter(
    (p) => p.categoryId === categoryId
  );

  const handleAddProduct = () => {
    console.log("Hihi");
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
      {filterProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* 新增商品的彈窗 */}
      <Modal
        open={isAddModalOpen}
        title="新增商品"
        onOk={handleAddProduct}
        onCancel={() => setIsAddModalOpen(false)}
        okText="新增"
        cancelText="取消"
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 5 }}
        >
          <Form.Item
            label="商品名稱"
          
            className="w-full"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item label="金額" required>
            <Input />
          </Form.Item>
          <Form.Item label="可素食">
            <Checkbox className="checkbox-lg" />
          </Form.Item>
          <Form.Item label="圖片">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default index;
