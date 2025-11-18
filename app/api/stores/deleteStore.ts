import { API_BASE_URL } from "@/api/config";

export const deleteStore = async (storeId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores/${storeId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`刪除店家失敗：${errorText.message}`);

      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    alert("刪除店家失敗，請聯絡管理員");

    return false;
  }
};
