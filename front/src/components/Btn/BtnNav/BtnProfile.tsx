import React from "react";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const App: React.FC = () => {
  return (
    <Link href="../../navigation/profile">
      <Button>
        <UserOutlined />
      </Button>
    </Link>
  );
};
export default App;
