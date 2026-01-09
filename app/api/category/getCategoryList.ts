import { API_BASE_URL } from "@/api/config";

export type Category = {
  nth: number;
  storeId: string;
  title: string;
  _creationTime: number;
  _id: string;
};

export type Categories = {
  page: Category[];
  continueCursor: string;
  isDone: boolean;
};

export class CategoryListAPIError extends Error {}

export const getCategoryList = async (storeId: string) => {
  const res = await fetch(
    `${API_BASE_URL}/stores/${storeId}/product-categories`
  );

  if (!res.ok) {
    throw new CategoryListAPIError("取得類別列表資料失敗（非預期錯誤，請聯絡後端）");
  }

  try {
    const data = (await res.json()) as Categories;
    return data;
  } catch (err) {
    console.error(err);
    throw new CategoryListAPIError("取得類別列表格式錯誤（非預期錯誤，請聯絡後端）");
  }
};
