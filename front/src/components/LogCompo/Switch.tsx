"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Switch } from "antd";

const SwitchPage = () => {
  const [switchState, setSwitchState] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchState(checked);
  };
  return (
    <div className="switch-container" style={{ marginBottom: 20 }}>
      {<switch /> && (
        <Link href="/Log/signup">
          <Switch checked={switchState} onChange={handleSwitchChange} />
        </Link>
      )}
    </div>
  );
};

export default SwitchPage;
