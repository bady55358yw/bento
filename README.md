# Bento - 團購訂餐工具

一個提供店家、商品與訂單管理的團購訂餐工具，適合公司內部協作使用。

## 功能重點

- **店家管理**：建立、編輯、刪除店家資訊（名稱、地址、營業時間、外送資訊等）
- **商品分類**：為店家建立商品分類，支援新增、編輯、刪除分類
- **商品管理**：管理每個分類下的商品（名稱、價格、備註、素食標記等）
- **批次刪除**：支援刪除店家、分類及商品
- **實時更新**：操作後立即反映在UI上，無需手動刷新
- **響應式設計**：支援多設備瀏覽
- **表單驗證**：確保用戶輸入的資料完整有效

## 使用技術

**前端框架**
- React 19：現代化的UI框架
- React Router 7：全棧路由解決方案，支援loader及action

**狀態管理與資料**
- Zustand：輕量級狀態管理
- React Hook Form：高效的表單管理
- Zod：TypeScript優先的schema驗證

**UI 組件與樣式**
- Ant Design 6：企業級UI組件庫
- TailwindCSS 4：utility-first CSS框架
- clsx：條件式class名稱組合

**開發工具**
- TypeScript 5：強型別支援
- Vite 7：高速前端構建工具
- Tailwind Vite Plugin：TailwindCSS Vite整合
- SVG React Plugin：SVG作為React組件使用

**其他**
- Error Boundary：錯誤邊界處理

## 安裝與啟動

### 環境要求
- Node.js 18+

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

應用將在 `http://localhost:5173` 啟動。

### 建立生產版本

```bash
npm run build
```

### 啟動生產伺服器

```bash
npm run start
```

## 專案結構

```
bento/
├── app/
│   ├── api/                    # API 調用層
│   │   ├── config.ts           # API 配置
│   │   ├── reset.ts            # 重置接口
│   │   ├── category/           # 分類相關API
│   │   ├── product/            # 商品相關API
│   │   └── stores/             # 店家相關API
│   │
│   ├── components/             # 可複用組件
│   │   ├── CategoryTabs.tsx     # 分類標籤組件
│   │   ├── Loading.tsx          # 載入狀態組件
│   │   ├── StoreCard.tsx        # 店家卡片組件
│   │   └── Products/            # 商品相關組件
│   │
│   ├── layouts/                # 版面配置
│   │   ├── MainLayout.tsx       # 主要版面（顯示Header + 登出按鈕）
│   │   ├── SimpleLayout.tsx     # 簡單版面（只有Logo）
│   │   └── EmptyLayout.tsx      # 空版面（隱藏Header）
│   │
│   ├── routes/                 # 路由頁面
│   │   ├── home.tsx            # 首頁
│   │   ├── auth/                # 認證相關
│   │   └── stores/              # 店家管理頁面
│   │       ├── index.tsx        # 店家列表
│   │       ├── edit.tsx         # 編輯店家
│   │       ├── [storeId]/       # 店家詳情
│   │       └── new/             # 新增店家流程
│   │           ├── newContainer.tsx  # 新增店家容器
│   │           ├── step1.tsx         # 步驟一
│   │           ├── step2.tsx         # 步驟二
│   │           └── step3.tsx         # 步驟三：確認與提交
│   │
│   ├── assets/                 # 靜態資源
│   ├── app.css                 # 全域樣式
│   ├── root.tsx                # 根組件
│   └── routes.ts               # 路由配置
│
├── public/                     # 公開資源
├── package.json                # 依賴配置
├── tsconfig.json               # TypeScript配置
├── vite.config.ts              # Vite配置
├── react-router.config.ts      # React Router配置
└── Dockerfile                  # Docker配置

```
