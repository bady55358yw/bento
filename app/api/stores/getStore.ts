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

export class StoreAPIError extends Error {}

export const getStore = async (storeId: string) => {
  const res = await fetch(`${API_BASE_URL}/stores/${storeId}`);

  if (res.status === 404) {
    const errorText = (await res.json()).message;
    throw new StoreAPIError(`取得店家資料失敗(${storeId}, 404) | ${errorText}`);
  }

  if (!res.ok) {
    throw new StoreAPIError("取得店家資料資料失敗（非預期錯誤，請聯絡後端）");
  }

  try {
    const data = (await res.json()) as Store;
    return data;
  } catch (err) {
    console.error(err);
    throw new StoreAPIError("取得店家資料格式錯誤（非預期錯誤，請聯絡後端）");
  }
};
