import "./toast.css";
import { useToast } from "../../context/toast-context";

export const Toast = () => {
  const { message, type } = useToast();
  return type === "success" ? (
    <div className="alert alert-success">✅ {message}</div>
  ) : (
    <div className="alert alert-danger">❌ {message}</div>
  );
};
