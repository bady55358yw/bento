import { useNavigate } from "react-router";
import { Input, Button } from "antd";

function login() {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 h-full">
      <h1 className="text-3xl text-gray-800 font-medium">超級帳號</h1>
      <Input
        size="large"
        placeholder="請輸入特別帳號..."
        className="max-w-[360px]"
      />
      <Button onClick={() => navigate("/stores")} color="primary" variant="solid">
        登入
      </Button>
    </div>
  );
}

export default login;
