// src/components/LoginForm.tsx
"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from "../../images/logo.png";
import { useState } from "react";
// Import your custom styles if needed
const LoginForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      console.log(response);

      if (!response.ok) {
        message.error(response.error);
      } else {
        //onnexion réussie, redirection ou traitement supplémentaire
        router.push("/navigation/actualite");
      }
    } catch (error) {
      message.error("invalid credentials");
    }
  };

  return (
    <div className="container">
      <img
        src={logo.src}
        alt="Login"
        style={{ width: "150px", marginTop: "40px" }}
      />
      <Form
        name="loginForm"
        className="box"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h4>Login</h4>
        <h5>Sign in to your account.</h5>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            style={{ width: "400px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            style={{ width: "400px" }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
