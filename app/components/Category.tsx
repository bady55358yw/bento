import { Form, Input, Modal, Tabs } from "antd";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { createCategory } from "@/api/category/createCategory";
import { updateCategory } from "@/api/category/updateCategory";
import { deleteCategory } from "@/api/category/deleteCategory";
import type {
  CategoryResponse,
  UpdateCategoryPayload,
  CreateCategoryPayload,
} from "@/types/category";

type CategoryProps = {
  storeId: string;
  categoryData: CategoryResponse;
};
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

function Category({ storeId, categoryData }: CategoryProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<string>("");

  const [modal, contextHolder] = Modal.useModal();

  // 先把後端的 categoryData 放到 tabs
  useEffect(() => {
    const categoryList = categoryData.page;
    if (categoryList.length > 0) {
      // 把類別列表資料轉成 Ant design 對應的
      const mapCategories = categoryList.map((c) => ({
        // 類別名稱、編輯 icon
        label: (
          <span className="flex items-center gap-4">
            {c.title}
            <EditOutlined
              onClick={(e) => {
                e.stopPropagation();
                setIsEditModalOpen(true);
                setErrorMsg("");
                setCategoryName(c.title);
                setEditingCategoryId(c._id);
              }}
              className="text-colorTextTertiary! hover:text-colorText! transition!"
            />
          </span>
        ),
        title: c.title,
        key: c._id, // 類別唯一值
        children: null, // 類別內容
      }));

      setCategories(mapCategories);
      setActiveCategory(categoryList[0]?._id);
    }
  }, [categoryData]);

  // 處理點擊「新增類別按鈕」的事件觸發
  const handleOpenModal = () => {
    setIsAddModalOpen(true);
    setCategoryName("");
    setErrorMsg("");
  };

  // 處理「新增類別功能」
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMsg("請輸入類別名稱");
      return;
    }

    const payload: CreateCategoryPayload = {
      title: categoryName,
    };

    const categoryData = await createCategory(storeId, payload);

    if (categoryData) {
      const newCategory = {
        label: (
          <span className="flex items-center gap-4">
            {categoryName}
            <EditOutlined
              onClick={(e) => {
                e.stopPropagation();
                setIsEditModalOpen(true);
                setErrorMsg("");
                setCategoryName(categoryName);
              }}
              className="text-colorTextTertiary! hover:text-colorText! transition!"
            />
          </span>
        ), // 類別名稱
        title: categoryName,
        key: categoryData._id, // 類別唯一值
        children: null, // 類別內容
      };

      setCategories((prev) => [...prev, newCategory]);
      setActiveCategory(categoryData._id);
      setIsAddModalOpen(false);
    }
  };

  // 處理「修改類別功能」
  const handleEditCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMsg("請輸入類別名稱");
      return;
    }

    const payload: UpdateCategoryPayload = {
      title: categoryName,
    };

    const isEditCategorySuccessed = await updateCategory(
      storeId,
      editingCategoryId,
      payload
    );

    if (isEditCategorySuccessed) {
      setCategories((prev) =>
        prev.map((cate) =>
          cate.key === editingCategoryId
            ? {
                ...cate,
                // 類別名稱、編輯 icon
                label: (
                  <span className="flex items-center gap-4">
                    {categoryName}
                    <EditOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditModalOpen(true);
                        setErrorMsg("");
                        setCategoryName(categoryName);
                        setEditingCategoryId(editingCategoryId);
                      }}
                      className="text-colorTextTertiary! hover:text-colorText! transition!"
                    />
                  </span>
                ),
                title: categoryName,
              }
            : cate
        )
      );

      setIsEditModalOpen(false);
    }
  };

  // 處理「刪除類別功能」
  const handleDeleteCategory = async (targeyCategoryId: TargetKey) => {
    const categoryId = targeyCategoryId as string; // 將 categoryId 強制轉為 string
    const categoryName = categories.find(
      (cate) => cate.key === categoryId
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
          setCategories((prev) => {
            const filterCategories = prev.filter(
              (cate) => cate.key !== categoryId
            );

            // 更新 active 的 tab
            if (activeCategory === categoryId) {
              setActiveCategory(
                filterCategories.length > 0 ? filterCategories[0].key : null
              );
            }

            return filterCategories;
          });
        }
      },
    });
  };

  // 只有「editable-card」類型的 tab，並且有用到內建的新增和刪除，才需要 onEdit
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      //Ant Design 給的 action：新增 tab
      handleOpenModal();
    } else {
      //Ant Design 給的 action：刪除 tab
      handleDeleteCategory(targetKey);
    }
  };

  return (
    <>
      <Tabs
        onChange={(key) => setActiveCategory(key)}
        activeKey={activeCategory ?? undefined}
        type="editable-card"
        onEdit={onEdit}
        items={categories}
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

export default Category;
