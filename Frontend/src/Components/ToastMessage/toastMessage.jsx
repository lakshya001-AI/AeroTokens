import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ToastMessage = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#0a66ff",
          color: "#fff",
          borderRadius: "10px",
          padding: "10px 16px",
          fontSize: "15px",
          fontWeight: 500,
        },
      }}
    />
  );
};

// helper functions
export const showSuccessToast = (message) => {
    toast.success(message, {
        duration: 4000,
        position: 'top-center',
        icon: "✅",
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        duration: 4000,
        position: 'top-center',
        icon: "❌",
    });
};

export default ToastMessage;
