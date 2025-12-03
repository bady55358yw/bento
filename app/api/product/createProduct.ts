import { API_BASE_URL } from "@/api/config";

type CreateProductPayload = {
  categoryId: string;
  name: string;
  price: number;
  notes: string;
  isVegetarian: boolean;
};

export const createProduct = async (
  storeId: string,
  productData: CreateProductPayload
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores/${storeId}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    // 處理失敗 response
    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`新增商品失敗：${errorText.message}`);

      return false;
    }

    // 處理成功 response
    return true;
  } catch (err) {
    // 處理例外錯誤
    console.error(err);
    alert("新增商品失敗，請聯絡管理員");

    return false;
  }
};
