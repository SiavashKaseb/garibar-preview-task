import type { ThemeConfig } from "antd";

export const appTheme: ThemeConfig = {
  token: {
    colorPrimary: "#0f766e",
    colorInfo: "#0f766e",
    colorSuccess: "#047857",
    colorWarning: "#d97706",
    colorError: "#e11d48",
    colorText: "#1e293b",
    colorTextSecondary: "#64748b",
    colorBorder: "#e2e8f0",
    colorBgLayout: "#f3efe6",
    borderRadius: 12,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    controlHeight: 40,
  },
  components: {
    Button: {
      borderRadius: 12,
      fontWeight: 600,
      paddingInline: 16,
    },
    Input: {
      borderRadius: 12,
    },
    InputNumber: {
      borderRadius: 12,
    },
    Select: {
      borderRadius: 12,
    },
    Table: {
      headerBg: "#f7f5ef",
      headerColor: "#475569",
      headerSplitColor: "transparent",
      rowHoverBg: "#f0fdfa",
      borderColor: "#eeeae0",
    },
    Modal: {
      borderRadiusLG: 20,
      titleFontSize: 18,
    },
    Tag: {
      borderRadiusSM: 999,
    },
  },
};
