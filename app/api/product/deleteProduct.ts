import { API_BASE_URL } from "@/api/config";

export const deleteProduct = async (storeId: string, id: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/stores/${storeId}/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`刪除商品失敗：${errorText.message}`);

      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    alert("刪除商品失敗，請聯絡管理員");

    return false;
  }
};
