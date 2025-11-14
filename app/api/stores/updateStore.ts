import { type CreateStorePayload } from "@/types/stores";

export const updateStore = async (
  storeId: string,
  storeData: CreateStorePayload
) => {
  try {
    const res = await fetch(
      `https://bento-api.qzcurious.link/stores/${storeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeData),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    return true;
  } catch (err) {
    console.log("修改店家失敗：", err);
    return false;
  }
};