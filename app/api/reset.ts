import { API_BASE_URL } from "@/api/config";

export const reset = async () => {
  // 指定 seed 個數
  const res = await fetch(`${API_BASE_URL}/seed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      storeCount: 40,
      categoriesPerStore: 8,
      productsPerCategory: 40,
    }),
  });

  // 清空新增的資料
  // const res = await fetch(`${API_BASE_URL}/seed/reset`, {
  //   method: "POST",
  // });

  if (res.status === 400) {
    throw new Error("重置失敗(404) | 資料筆數過多，最多只能 16000 筆");
  }

  if (res.status === 403) {
    throw new Error("重置失敗(403) | 目前無法使用此功能");
  }

  if (!res.ok) {
    throw new Error("重置失敗（非預期錯誤，請聯絡後端）");
  }
};
