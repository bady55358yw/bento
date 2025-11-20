import { API_BASE_URL } from "@/api/config";
import type { CreateCategoryPayload } from "@/types/category";

export const createCategory = async (storeId:string, payload:CreateCategoryPayload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores/${storeId}/product-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // 處理失敗 response
    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`新增類別失敗：${errorText.message}`);

      return null;
    }

    // 處理成功 response
    const data = await res.json();
    return data;
  } catch (err) {
    // 處理例外錯誤
    console.error(err);
    alert("新增類別失敗，請聯絡管理員");

    return null;
  }
};
