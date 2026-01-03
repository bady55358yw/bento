import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import { createCategory } from "@/api/category/createCategory";
import { deleteCategory } from "@/api/category/deleteCategory";
import { updateCategory } from "@/api/category/updateCategory";
import Products from "@/components/Products/";
import type { Categories } from "@/api/category/getCategoryList";
import { useAsyncValue, useLoaderData, useRevalidator } from "react-router";

type CategoryProps = {
  storeId: string;
  categoryListData: Categories
};
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

function CategoryTabs({ storeId,categoryListData }: CategoryProps) {
  // console.log(categoryListData)
  const revalidator = useRevalidator();

  // 共用欄位
  const [categoryName, setCategoryName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // active tab
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // modal 控制
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 編輯類別用
  const [editingCategoryId, setEditingCategoryId] = useState("");

  // Ant Design 的 Modal.useModal() 用
  const [modal, contextHolder] = Modal.useModal();

  // 從 loader 拿到類別資料
  // const [, categoryListData] = useAsyncValue() as [unknown, Categories];

  const categoryList =
    categoryListData.page.length > 0 ? categoryListData.page : [];

  /*  === 表單驗證（手寫）=> 類別名稱不可為空 ===  */
  const validateCategoryName = () => {
    if (!categoryName.trim()) {
      setErrorMsg("請輸入類別名稱");
      return false;
    }
    return true;
  };

  /*  === 處理「新增類別功能」 ===  */
  const handleAddCategory = async () => {
    if (!validateCategoryName()) {
      return;
    }

    const payload = {
      title: categoryName,
    };

    const newCategory = await createCategory(storeId, payload);

    if (newCategory) {
      setIsAddModalOpen(false);
      revalidator.revalidate();
      setActiveCategory(newCategory._id);
    }
  };

  /*  === 處理「修改類別功能」 ===  */
  const handleEditCategory = async () => {
    if (!validateCategoryName()) {
      return;
    }

    const payload = {
      title: categoryName,
    };

    const isEditCategorySuccessed = await updateCategory(
      storeId,
      editingCategoryId,
      payload
    );

    if (isEditCategorySuccessed) {
      revalidator.revalidate();
      setIsEditModalOpen(false);
      setActiveCategory(editingCategoryId);
    }
  };

  /*  === 處理「刪除類別功能」 ===  */
  const handleDeleteCategory = async (targeyCategoryId: TargetKey) => {
    const categoryId = targeyCategoryId as string; // 將 categoryId 強制轉為 string
    const categoryName = categoryList.find(
      (cate) => cate._id === categoryId
    )?.title;

    modal.confirm({
      title: "確定要刪除類別？",
      content: `「${categoryName}」將會被永久刪除，無法復原。`,
      okText: "刪除",
      okType: "danger",
      cancelText: "取消",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const isDeleteCategorySuccessed = await deleteCategory(
          storeId,
          categoryId
        );

        if (isDeleteCategorySuccessed) {
          revalidator.revalidate();
          const remain = categoryList.filter((c) => c._id !== categoryId);
          setActiveCategory(remain[0]?._id ?? null);
        }
      },
    });
  };

  /*  === 處理「Tab 新增/刪除事件」：只有「editable-card」類型的 tab，並且有用到內建的新增和刪除，才需要 onEdit ===  */
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      //Ant Design 給的 action：新增 tab
      setIsAddModalOpen(true);
      setErrorMsg("");
      setCategoryName("");
    } else {
      //Ant Design 給的 action：刪除 tab
      handleDeleteCategory(targetKey);
    }
  };

  /*  === 類別列表項目 ===  */
  const tabItems = categoryList.map((category) => ({
    key: category._id, // 類別唯一值
    // 類別標籤（手動加入修改按鈕）
    label: (
      <span className="flex items-center gap-4">
        {category.title}
        <EditOutlined
          onClick={(e) => {
            e.stopPropagation();
            setIsEditModalOpen(true);
            setErrorMsg("");
            setCategoryName(category.title);
            setEditingCategoryId(category._id);
          }}
          className="text-colorTextTertiary! hover:text-colorText! transition!"
        />
      </span>
    ),
    title: category.title, // 類別標題
    children: <Products categoryId={category._id} storeId={storeId} />, // 類別內容
  }));

  return (
    <>
      <Tabs
        onChange={(key) => setActiveCategory(key)}
        activeKey={activeCategory ?? tabItems[0]?.key}
        type="editable-card"
        onEdit={onEdit}
        items={tabItems}
        size="large"
        tabBarGutter={10}
      />

      {/* 新增類別的彈窗 */}
      <Modal
        open={isAddModalOpen}
        title="新增類別"
        onOk={handleAddCategory}
        onCancel={() => setIsAddModalOpen(false)}
        okText="新增"
        cancelText="取消"
      >
        <form action="" className="my-6">
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="輸入類別名稱"
          ></Input>
          {errorMsg && <p className="text-colorError mt-1">{errorMsg}</p>}
        </form>
      </Modal>

      {/* 修改類別的彈窗 */}
      <Modal
        open={isEditModalOpen}
        title="修改類別"
        onOk={handleEditCategory}
        onCancel={() => setIsEditModalOpen(false)}
        okText="修改"
        cancelText="取消"
      >
        <form action="" className="my-6">
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="輸入類別名稱"
          ></Input>
          {errorMsg && <p className="text-colorError mt-1">{errorMsg}</p>}
        </form>
      </Modal>

      {/* 確認刪除類別的對話框（Ant Design 的 Modal.useModal() 用） */}
      {contextHolder}
    </>
  );
}

export default CategoryTabs;
