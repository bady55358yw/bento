import { API_BASE_URL } from "@/api/config";

export type Store = {
  _id: string;
  _creationTime: number;
  name: string;
  description: string;
  phone: string;
  address: string;
  deliveryAvailable: boolean;
  deliveryFee: number;
  deliveryMinimum: number;
};

export const getStore = async (storeId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores/${storeId}`);

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`取得店家資料失敗：${errorText.message}`);

      return null;
    }

    const data = (await res.json()) as Store;
    return data;
  } catch (err) {
    console.error(err);
    alert("取得店家資料失敗，請聯絡管理員");

    return null;
  }
};
