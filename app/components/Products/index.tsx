import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ProductCard from "./ProductCard";
import type { Products } from "@/types/product";
import { useLoaderData } from "react-router";

type ProductsProps = {
  categoryId: string;
};

function index({ categoryId }: ProductsProps) {
  const { productListData }: { productListData: Products } = useLoaderData();
  const filterProducts = productListData.products.filter(
    (p) => p.categoryId === categoryId
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-2">
      <Button
        type="dashed"
        className="h-[220px]! min-w-[142px] rounded-xl! text-colorTextTertiary! hover:text-colorPrimaryHover!"
      >
        <PlusOutlined className="flex! items-center! justify-center! text-2xl" />
      </Button>
      {filterProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default index;
