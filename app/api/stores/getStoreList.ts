import { API_BASE_URL } from "@/api/config";
import type { Store } from "./getStore";

export type StoreListRes = {
  page: Store[];
  continueCursor: string;
  isDone: boolean;
};

export const getStoreList = async (continueCursor?: string|null) => {
  const url =
    continueCursor !== null && continueCursor !== undefined
      ? `${API_BASE_URL}/stores?cursor=${continueCursor}`
      : `${API_BASE_URL}/stores`;
  const res = await fetch(url)

  if (!res.ok) {
    alert("取得店家列表資料失敗（非預期錯誤，請聯絡後端）");
    throw new Error("取得店家列表資料失敗（非預期錯誤，請聯絡後端）");
  }

  try {
    const data = (await res.json()) as StoreListRes;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("取得店家列表資料失敗（非預期錯誤，請聯絡後端）");
  }
};
