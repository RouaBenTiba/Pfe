"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import logo from "../../images/logo.png";
import axios from "axios";
import { useSession } from "next-auth/react";
const Signup = () => {
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    // Add your login logic here
    try {
      const response = await axios.post(
        "http://localhost:6000/api/register",
        {
          ...values,
        },
        {
          headers: {
            Authorization: "Bearer " + session?.user!.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div className="container">
      <img
        src={logo.src}
        alt="Login"
        style={{ width: "90px", marginTop: "40px" }}
      />
      <Form
        name="loginForm"
        className="box"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h4>Welcome To Point Y Day</h4>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your firstname!" }]}
        >
          <Input placeholder="First Name" style={{ width: "400px" }} />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your lastname!" }]}
        >
          <Input placeholder="Last Name" style={{ width: "400px" }} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" style={{ width: "400px" }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Don't forget password!" }]}
        >
          <Input.Password
            placeholder="Create Your Password"
            style={{ width: "400px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Don't forget password!" }]}
        >
          <Input.Password
            placeholder="Confirm Your Password"
            style={{ width: "400px" }}
          />
        </Form.Item>

        <Button htmlType="submit">signup</Button>
      </Form>
    </div>
  );
};
export default Signup;
