import { API_BASE_URL } from "@/api/config";

export type UpdateStorePayload = {
  name: string;
  description: string;
  phone: string;
  address: string;
  deliveryAvailable: boolean;
  deliveryFee: number;
  deliveryMinimum: number;
};

export const updateStore = async (storeId: string, storeData: UpdateStorePayload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stores/${storeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`修改店家失敗：${errorText.message}`);

      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    alert("修改店家失敗，請聯絡管理員");

    return false;
  }
};
