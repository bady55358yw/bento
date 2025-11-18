import { type StorePayload } from "@/types/stores";
import { API_BASE_URL } from "@/api/config";

export const createStore = async (storeData: StorePayload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    // 處理失敗 response
    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`新增店家失敗：${errorText.message}`);

      return null;
    }

    // 處理成功 response
    const data = await res.json();
    return data;
  } catch (err) {
    // 處理例外錯誤
    console.error(err);
    alert("新增店家失敗，請聯絡管理員");

    return null;
  }
};
