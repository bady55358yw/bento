import { Button, Input } from "antd";
import { useNavigate } from "react-router";
const { TextArea } = Input;

function step1() {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8">
      <div className="flex flex-col items-center w-full gap-2">
        <h1 className="text-3xl text-colorText my-6">Step 1｜選擇店家</h1>

        <form action="" className="flex flex-col gap-y-8 w-full max-w-[540px]">
          <div className="flex flex-col gap-2 text-colorTextSecondary">
            <label htmlFor="" className="">
              店名
            </label>
            <Input size="large" className="" />
          </div>

          <div className="flex flex-col gap-2 text-colorTextSecondary">
            <label htmlFor="" className="">
              電話
            </label>
            <Input size="large" className="" />
          </div>

          <div className="flex flex-col gap-2 text-colorTextSecondary">
            <label htmlFor="" className="">
              地址
            </label>
            <TextArea rows={3} />
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center gap-x-8 w-full">
        <Button
          onClick={() => navigate("/stores")}
          size="large"
          color="primary"
          variant="outlined"
        >
          取消
        </Button>

        <div className="flex gap-x-2">
          <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
          <span className="block w-16 h-1 bg-colorFill"></span>
          <span className="block w-16 h-1 bg-colorFill"></span>
        </div>

        <Button size="large" color="primary" variant="solid">
          下一步
        </Button>
      </div>
    </div>
  );
}

export default step1;
