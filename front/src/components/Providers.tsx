"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

interface IProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviders) {
  const queryClient = new QueryClient();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorWarning: "#ab8e54",
          colorError: "#FB0003",
          colorPrimary: "#1890FF",
          colorPrimaryHover: "#a4b9be",
          colorInfo: "rgb(24, 144, 255)",
          colorInfoHover: "rgb(24, 144, 255)",
          fontSize: 15,
        },
        components: {
          Button: {
            colorPrimary: "rgb(24, 144, 255)",
            colorLinkHover: "rgb(24, 144, 255)",
            colorPrimaryBorder: "rgb(24, 144, 255)",
            colorPrimaryActive: "rgb(24, 144, 255)",
            colorError: "black",
            colorText: "rgb(24, 144, 255)",
          },
          Layout: {
            headerBg: "rgba(182, 60, 60, 0)",
            bodyBg: "rgba(249, 244, 244, 0)",
            footerBg: "rgba(111, 217, 33, 0)",
            triggerBg: "#000000",
            triggerHeight: 52,
            siderBg: "#F3F3F3",
          },
          Menu: {
            darkItemBg: "#F3F3F3",
            iconSize: 25,
            itemHeight: 47,
            itemMarginBlock: 10,
            fontSize: 17,

            colorTextLightSolid: "#00000",
          },
          Input: {
            controlHeight: 50,
          },
          Select: {
            controlHeight: 50,
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
