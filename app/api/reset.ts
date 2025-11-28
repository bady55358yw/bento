import { API_BASE_URL } from "@/api/config";

export const reset = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/seed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clear: true,
      }),
    });

    // 處理失敗 response
    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText);
      alert(`seed 類別失敗：${errorText.message}`);
    }

  } catch (err) {
    // 處理例外錯誤
    console.error(err);
    alert("seed 類別失敗，請聯絡管理員");
  }
};
