import "./signup-page.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/toast-context";
import { useUser } from "../../context/user-context";
import { Toast } from "../../components";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { showToast, show } = useToast();
  const { signupUser } = useUser();

  function signupHandler({ event }) {
    event.preventDefault();
    if (email === "" || firstName === "" || lastName === "") {
      showToast({ message: "Enter all fields", type: "error" });
      return;
    }
    if (password.length < 6) {
      showToast({
        message: "Password must be greater than 6 characters",
        type: "error",
      });
      return;
    }
    if (password !== password2) {
      showToast({ message: "Passwords do not match", type: "error" });
      return;
    }
    signupUser({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
  }

  return (
    <div className="signup-container">
      {show && <Toast />}
      <form className="form-wrapper">
        <label className="input-label" htmlFor="firstName">
          First Name{" "}
        </label>
        <input
          className="input"
          type="text"
          name="firstName"
          id="firstName"
          required
          value={firstName}
          placeholder="Enter your first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="input-label" htmlFor="lastName">
          Last Name{" "}
        </label>
        <input
          className="input"
          type="text"
          name="lastName"
          id="lastName"
          required
          value={lastName}
          placeholder="Enter your last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="input-label" htmlFor="email">
          Email Address{" "}
        </label>
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          required
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="input-label" htmlFor="password">
          Password{" "}
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          required
          value={password}
          placeholder="(minimum 6 characters)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="input-label" htmlFor="password2">
          Confirm Password{" "}
        </label>
        <input
          className="input"
          type="password"
          name="password2"
          id="password2"
          required
          value={password2}
          placeholder="Re-enter password"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <div className="checkbox-div">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember"> Remember me</label>
        </div>
        <span className="input-label btn-link">
          <a href="#">Forgot your Password?</a>
        </span>
        <input
          className="btn btn-primary-solid btn-login"
          type="submit"
          value="Create Account"
          onClick={(event) =>
            signupHandler({
              event,
            })
          }
        />

        <button className="btn btn-link">
          <Link to="/login">Already have an account?</Link>
        </button>
      </form>
    </div>
  );
};

export { SignupPage };
