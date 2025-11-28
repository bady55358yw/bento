import { API_BASE_URL } from "@/api/config";

export const getProductList = async (storeId: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/stores/${storeId}/products`
    );

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`取得商品資料失敗：${errorText.message}`);

      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    alert("取得商品資料失敗，請聯絡管理員");

    return null;
  }
};
