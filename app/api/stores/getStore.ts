export const getStore = async (storeId: string) => {
  try {
    const res = await fetch(
      `https://bento-api.qzcurious.link/stores/${storeId}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("取得店家資料失敗", err);
    return null;
  }
};