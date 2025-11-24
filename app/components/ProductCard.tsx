import productImage01 from "@/assets/product-01.png";
import productImage02 from "@/assets/product-02.png";

function ProductCard() {
  return (
    <>
      <div className="relative flex flex-col min-w-[142px] w-full h-[200px] drop-shadow-sm">
        {/* price */}
        <div className="absolute px-2 py-1 bg-colorPrimaryBg/70 top-3 text-sm font-semibold">
          $200
        </div>

        {/* pic */}
        <div className="flex-1 w-full h-full overflow-hidden rounded-t-xl bg-colorBgLayout">
          <img
            src={productImage01}
            alt="商品圖片"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* name */}
        <div className="px-4 py-2 w-full bg-white rounded-b-xl text-center">
          <p className="truncate">商品名稱</p>
        </div>
      </div>
      <div className="relative flex flex-col min-w-[142px] w-full h-[200px] drop-shadow-sm">
        {/* price */}
        <div className="absolute px-2 py-1 bg-colorPrimaryBg/70 top-3 text-sm font-semibold">
          $200
        </div>

        {/* pic */}
        <div className="flex-1 w-full h-full overflow-hidden rounded-t-xl bg-colorBgLayout">
          <img
            src={productImage02}
            alt="商品圖片"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* name */}
        <div className="px-4 py-2 w-full bg-white rounded-b-xl text-center">
          <p className="truncate">商品名稱</p>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
