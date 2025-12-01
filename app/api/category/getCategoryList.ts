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

export const getCategoryList = async (storeId: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/stores/${storeId}/product-categories`
    );

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`取得類別列表資料失敗：${errorText.message}`);

      return null;
    }

    const data = (await res.json()) as Categories;
    return data;
  } catch (err) {
    console.error(err);
    alert("取得類別列表資料失敗，請聯絡管理員");

    return null;
  }
};
