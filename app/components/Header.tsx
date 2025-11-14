import { useNavigate } from "react-router";
import { Button } from "antd";

function Header() {
  let navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-8 sm:px-16 py-4 border-b border-gray-300">
      <div className="text-colorPrimary font-semibold text-lg">Logo</div>
       <Button onClick={() => navigate("/login")} color="default" variant="text" className="text-gray-500!">登出</Button>
    </div>
  );
}

export default Header;
