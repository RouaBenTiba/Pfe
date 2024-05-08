"use client";
import React, { useState } from "react";
import SignupForm from "../../../components/LogCompo/SignupForm";
import { Switch } from "antd";
import Link from "next/link";
import "./style.css";
const Signup = () => {
  const [switchState, setSwitchState] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchState(checked);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="switch-container" style={{ marginBottom: 20 }}>
        {<switch /> && (
          <Link href="/Log/login">
            <Switch checked={switchState} onChange={handleSwitchChange} />
          </Link>
        )}
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
