import React from "react";
import LoginForm from "../../../components/LogCompo/LoginForm";
import Switch from "../../../components/LogCompo/Switch";
import "./style.css";

const SignInPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Switch />
      <LoginForm />
    </div>
  );
};

export default SignInPage;
