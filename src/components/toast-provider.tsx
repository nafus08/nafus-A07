"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          border: "1px solid #dce8dc",
          borderRadius: "14px",
          fontFamily: "var(--font-bengali)",
        },
        success: { iconTheme: { primary: "#237a42", secondary: "#fff" } },
      }}
    />
  );
}
