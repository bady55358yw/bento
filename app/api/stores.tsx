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
