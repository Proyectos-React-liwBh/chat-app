import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ToastSuccess = (message, time=3000, clickFunction = () =>{} ) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    onClick: clickFunction,
  });
};

export const ToastError = (message, time=3000) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const ToastWarning = (message, time=3000) => {
  toast.warning(message, {
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const ToastInfo = (message, time=3000, clickFunction = () =>{}) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    onClick: clickFunction,
  });
};
