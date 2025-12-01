import { API_BASE_URL } from "@/api/config";

export type UpdateCategoryPayload = {
  title: string;
};

export const updateCategory = async (
  storeId: string,
  categoryId: string,
  payload: UpdateCategoryPayload
) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/stores/${storeId}/product-categories/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`修改類別失敗：${errorText.message}`);

      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    alert("修改類別失敗，請聯絡管理員");

    return false;
  }
};
