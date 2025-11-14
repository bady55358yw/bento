export const getStoreList = async () => {
  try {
    const res = await fetch("https://bento-api.qzcurious.link/stores");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("取得店家列表失敗", err);
    return null;
  }
};