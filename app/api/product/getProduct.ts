import { API_BASE_URL } from "@/api/config";

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  notes: string;
  isVegetarian: boolean;
};

export const getProduct = async (storeId: string, id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores/${storeId}/products/${id}`)

    if (!res.ok) {
        const errorText = await res.json();
        console.error(errorText);
        alert(`取得商品資料失敗：${errorText.message}`);

        return null
    }

    const data = (await res.json()) as Product;
    return data
  } catch (err) {
    console.error(err);
    alert("取得商品資料失敗，請聯絡管理員");

    return null
  }
};
