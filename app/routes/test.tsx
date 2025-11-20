import React, { useRef, useState } from "react";
import { Button, Tabs, Modal, Input } from "antd";

const test: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleAdd = () => {
    setIsModalOpen(true);
    setCategoryName("");
  };

  const addCategory = () => {
    if (!categoryName.trim()) return;

    const newCategory = {
      label: categoryName, // 類別名稱
      key: categoryName, // 類別唯一值
      children: null, // 類別內容
    };

    setCategories((prev) => [...prev, newCategory]);
    setActiveCategory(categoryName);
    setIsModalOpen(false)
  };

   const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      handleAdd();
    } 
  };

  return (
    <div>
      <Tabs
        onChange={(key)=>(setActiveCategory(key))}
        activeKey={activeCategory ?? undefined}
        type="editable-card"
        onEdit={onEdit}
        items={categories}
      />

      <Modal
        open={isModalOpen}
        title="新增類別"
        onOk={addCategory}
        onCancel={() => setIsModalOpen(false)}
        okText="新增"
        cancelText="取消"
      >
        <form action="" className="my-6">
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="輸入類別名稱"
          ></Input>
        </form>
      </Modal>
    </div>
  );
};

export default test;
