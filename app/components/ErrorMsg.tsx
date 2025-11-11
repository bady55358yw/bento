import { ExclamationCircleOutlined } from "@ant-design/icons";

type ErrorMsgProps = {
  msg?: string;
};

function ErrorMsg({ msg }: ErrorMsgProps) {
  return (
    <p className="text-colorError flex items-center gap-1 mt-1">
      <ExclamationCircleOutlined />
      {msg}
    </p>
  );
}

export default ErrorMsg;
