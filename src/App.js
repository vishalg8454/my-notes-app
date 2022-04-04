import { Routes, Route, Outlet } from "react-router-dom";
import { LandingPage } from "./routes";
import { HomePage } from "./routes";
import { Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
