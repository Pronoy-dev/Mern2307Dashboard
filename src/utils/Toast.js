import { toast, Bounce } from "react-toastify";
const ToastSucess = (msg) => {
  toast.success(msg || "🦄 Wow so easy!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const ToastError = (msg) => {
  toast.error(msg || "🦄 Wow so easy!", {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const infoToast = (msg) => {
  toast.info(msg || "🦄 Wow so easy!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
export { ToastSucess, ToastError, infoToast };
