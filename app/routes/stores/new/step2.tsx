import { Button, Input,Checkbox } from "antd";
import { useNavigate } from "react-router";
const { TextArea } = Input;

function step2() {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8">
      <div className="flex flex-col items-center w-full gap-6">
        <h1 className="text-3xl text-colorText my-6">Step 2｜店家資料</h1>

        <form action="" className="flex flex-col gap-y-8 w-full max-w-[640px]">
          <div className="flex flex-col gap-2 text-colorTextSecondary">
            <label htmlFor="" className="">
              店家描述
            </label>
            <TextArea rows={4} maxLength={120} showCount/>
          </div>

          <div className="flex items-center text-colorTextSecondary">
    
            <Checkbox className="checkbox-lg !text-colorTextSecondary !text-base">提供外送服務，外送低消：</Checkbox>
            <Input size="large" className="flex-1 !max-w-28" />
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center gap-x-8 w-full">
        <Button
          onClick={() => navigate("/stores/step-1")}
          size="large"
          color="primary"
          variant="outlined"
        >
          上一步
        </Button>

        <div className="flex gap-x-2">
          <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
          <span className="block w-16 h-1 bg-colorBgSpotlight"></span>
          <span className="block w-16 h-1 bg-colorFill"></span>
        </div>

        <Button onClick={() => navigate("/stores/step-3")} size="large" color="primary" variant="solid">
          下一步
        </Button>
      </div>
    </div>
  );
}

export default step2;
