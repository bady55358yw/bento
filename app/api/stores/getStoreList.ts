import { API_BASE_URL } from "@/api/config";

export const getStoreList = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores`);

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`取得店家列表失敗：${errorText.message}`);

      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    alert("取得店家列表失敗，請聯絡管理員");

    return null;
  }
};
