import { Button } from "antd";

function Header() {
  return (
    <div className="flex justify-between items-center px-8 sm:px-16 py-4 border-b border-gray-300">
      <div className="text-primary font-semibold text-lg">Logo</div>
       <Button color="default" variant="text" className="!text-gray-500">登出</Button>
    </div>
  );
}

export default Header;
