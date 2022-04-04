import { Outlet } from "react-router-dom";
import { Navbar,NavigationDrawer } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <NavigationDrawer />
      <Outlet />
    </>
  );
}

export default App;
