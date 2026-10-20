import App from "@/App.tsx";
import { QueryProvider } from "@/shared/api/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { appTheme } from "@/shared/ui/theme";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <StyleProvider layer>
        <ConfigProvider theme={appTheme}>
          <App />
        </ConfigProvider>
      </StyleProvider>
    </QueryProvider>
  </StrictMode>,
);
