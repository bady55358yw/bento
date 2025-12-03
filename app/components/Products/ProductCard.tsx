import productImage01 from "@/assets/product-01.png";
import IconLeaf from "@/assets/icon-leaf.svg?react";
import type { Product } from "@/api/product/getProductList";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <div className="flex flex-col min-w-[142px] w-full h-[220px] drop-shadow-sm">
        <div className="relative flex-1 w-full h-full overflow-hidden rounded-t-xl bg-colorBgLayout">
          {/* vegetarian */}
          {product.isVegetarian && (
            <div className="absolute flex items-center justify-center w-8 h-8 bg-white top-0 left-0 rounded-tl-xl rounded-br-xl text-sm font-semibold">
              <IconLeaf className="text-colorSuccess w-5 h-5" />
            </div>
          )}

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
    </>
  );
}

export default ProductCard;
