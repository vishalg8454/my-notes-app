import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("hey");
  const [type, setType] = useState("");

  function showToast({ message, type }) {
    setMessage((prevMessage) => message);
    setType((prevType) => type);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }

  return (
    <ToastContext.Provider value={{ show, type, message,showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, useToast };
