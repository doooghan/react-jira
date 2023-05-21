import { useAuth } from "@/context/auth-context";
import { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from ".";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await register(values);
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

      <Form.Item
        label="确认密码"
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
