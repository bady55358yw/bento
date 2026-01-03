import { API_BASE_URL } from "@/api/config";

export type CreateStorePayload = {
  name: string;
  description: string;
  phone: string;
  address: string;
  deliveryAvailable: boolean;
  deliveryFee: number;
  deliveryMinimum: number;
};

export const createStore = async (storeData: CreateStorePayload) => {
  const res = await fetch(`${API_BASE_URL}/stores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeData),
  });

  if (!res.ok) {
    alert("新增店家失敗，請重試或是回店家列表");
    throw new Error(
      `status:${res.status} | 取得店家列表資料失敗（非預期錯誤，請聯絡後端）`
    );
  }

  try {
    const data = (await res.json()) as string;
    return data;
  } catch (err) {
    console.error(err);
    alert("新增店家失敗，請重試或是回店家列表");
    throw new Error("新增店家失敗（非預期錯誤，請聯絡後端）");
  }
};
