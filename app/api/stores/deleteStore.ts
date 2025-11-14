export const deleteStore = async (storeId: string) => {
  try {
    const res = await fetch(
      `https://bento-api.qzcurious.link/stores/${storeId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return true;
  } catch (err) {
    console.log("刪除店家資料失敗", err);
    return false;
  }
};