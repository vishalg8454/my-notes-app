import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { useToast } from "./toast-context";

const UserContext = createContext(null);

const useUser = () => useContext(UserContext);
const tokenFromStorage = localStorage.getItem("token");

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const { showToast, message } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [encodedToken, setEncodedToken] = useState(tokenFromStorage);

  async function loginUser({ email, password }) {
    try {
      const userData = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      setEncodedToken(userData.data.encodedToken);
      localStorage.setItem("token", userData.data.encodedToken);
      setFirstName((p) => userData.data.foundUser.firstName);
      setLastName((p) => userData.data.foundUser.lastName);
      showToast({
        message: `Welcome ${userData.data.foundUser.firstName} ${userData.data.foundUser.lastName}`,
        type: "success",
      });
      navigate("/home");
    } catch (error) {
      showToast({ message: "Unable to log in", type: "error" });
    }
  }

  async function signupUser({ email, password, firstName, lastName }) {
    try {
      const userData = await axios.post("/api/auth/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });
      setEncodedToken(userData.data.encodedToken);
      localStorage.setItem("token", userData.data.encodedToken);
      setFirstName((p) => userData.data.createdUser.firstName);
      setLastName((p) => userData.data.createdUser.lastName);
      showToast({
        message: `Welcome ${userData.data.createdUser.firstName} ${userData.data.createdUser.lastName}`,
        type: "success",
      });
      navigate("/home");
    } catch (error) {
      showToast({ message: "Unable to sign up", type: "error" });
    }
  }

  return (
    <UserContext.Provider
      value={{ encodedToken, firstName, lastName, loginUser, signupUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
