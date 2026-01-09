import { API_BASE_URL } from "@/api/config";

export type UpdateProductPayload = {
  categoryId: string;
  name: string;
  price: number;
  notes: string;
  isVegetarian: boolean;
};

export const updateProduct = async (
  storeId: string,
  id: string,
  productData: UpdateProductPayload
) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/stores/${storeId}/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`修改商品失敗：${errorText.message}`);

      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    alert("修改商品失敗，請聯絡管理員");

    return false;
  }
};
