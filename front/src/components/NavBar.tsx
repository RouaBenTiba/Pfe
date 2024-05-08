"use client";
import React, { useState } from "react";
import logo from "../images/logo.png";
import BtnPointer from "./Btn/BtnNav/BtnPointer";
import NotifBtn from "./Btn/BtnNav/NotifBtn";
import BtnProfile from "./Btn/BtnNav/BtnProfile";
import BtnParam from "./Btn/BtnNav/BtnParam";

import { Layout, Menu, theme, MenuProps, Flex } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  PieChartOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Link from "next/link";
const { Header, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Actualité",
    "1",
    <Link href={"/navigation/actualite"}>
      <HomeOutlined />
    </Link>
  ),
  getItem(
    "Planning",
    "2",
    <Link href={"/navigation/plan"}>
      <CalendarOutlined />
    </Link>
  ),
  getItem(
    "Présence",
    "3",
    <Link href={"/navigation/presence"}>
      <CheckCircleOutlined />
    </Link>
  ),
  getItem(
    "Demandes",
    "4",
    <Link href={"/navigation/demande"}>
      <MessageOutlined />
    </Link>
  ),
  getItem(
    "Liste",
    "5",
    <Link href={"/navigation/Liste"}>
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    "Historique",
    "6",
    <Link href={"/navigation/historique"}>
      <HistoryOutlined />
    </Link>
  ),
];

interface Props {
  children: React.ReactNode;
}

const App = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value: boolean | ((prevState: boolean) => boolean)) =>
          setCollapsed(value)
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img
            src={logo.src}
            alt=""
            style={{
              width: "85px",
            }}
          />
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{
            marginTop: 20,
          }}
        ></Menu>
      </Sider>

      {/* Header */}
      <Layout>
        {/*Header 3 button*/}
        <Header>
          <div>
            <ul
              style={{
                display: "flex",
                flexDirection: "row",
                listStyleType: "none",
                justifyContent: "right",
                margin: 0,
                padding: 0,
              }}
            >
              <li style={{ marginRight: "10px" }}>
                <BtnPointer />
              </li>
              <li style={{ marginRight: "10px" }}>
                <BtnProfile />
              </li>
              <li style={{ marginRight: "10px" }}>
                <NotifBtn />
              </li>
              <li>
                <BtnParam />
              </li>
            </ul>
          </div>
        </Header>
        {/*Box blanc  */}
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 610,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
