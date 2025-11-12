import { type CreateStorePayload } from '@/types/stores'

export const createStore = async (storeData: CreateStorePayload) => {
  try {
    const res = await fetch("https://bento-api.qzcurious.link/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("新增店家成功");

    return data;
  } catch (err) {
    console.log("新增店家失敗：", err);
    return null;
  }
};


export const getStoreList = async () => {
  try {
    const res = await fetch("https://bento-api.qzcurious.link/stores");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("取得店家列表成功");

    return data;
  } catch (err) {
    console.log("取得店家列表失敗", err);
    return null;
  }
};
