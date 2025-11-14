import { type CreateStorePayload } from "@/types/stores";

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
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("新增店家失敗：", err);
    return null;
  }
};