import { toast } from "react-toastify";

const defaultStyle = {
  backgroundColor: "#12e2ef",
  color: "#fff",
  fontWeight: "bold",
};

export function useToast() {
  return {
    success: (msg, options = {}) =>
      toast.success(msg, { ...options, style: defaultStyle }),

    error: (msg, options = {}) =>
      toast.error(msg, {
        ...options,
        style: { backgroundColor: "#ff4757", color: "#fff", fontWeight: "bold" },
      }),

    info: (msg, options = {}) =>
      toast.info(msg, { ...options, style: defaultStyle }),
  };
}
