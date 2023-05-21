import { useAuth } from "@/context/auth-context";
import { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from ".";
import { useAsync } from "@/utils/use-async";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error: any) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>

      <Form.Item
        label="Password"
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};
