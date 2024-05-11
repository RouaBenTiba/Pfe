/*import React, { useEffect } from "react";

import { Button, notification, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
const { io } = require("socket.io-client");

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const socket = io("http://localhost:6000/api/send ");
    console.log(
      socket.on("firstEvent", (msg: any) => {
        console.log(msg);
      })
    );
  }, []);
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: "Notification Title",
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      onClose: close,
    });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        <BellOutlined />
      </Button>
    </>
  );
};

export default App;*/
import React, { useEffect } from "react";
import { Button, notification, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
const { io } = require("socket.io-client");

const close = () => {
  console.log("Notification was closed.");
};

const App = () => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const socket = io("http://localhost:6000");
    socket.on("notification", (data: any) => {
      openNotification();
    });

    return () => socket.disconnect();
  }, []);

  const openNotification = () => {
    api.open({
      message: "Notification Title",
      description: "Check your email for more details.",
      duration: 0,
      onClose: close,
    });
  };

  return (
    <>
      {contextHolder}
      <Button icon={<BellOutlined />} onClick={openNotification}>
        Show Notification
      </Button>
    </>
  );
};

export default App;
