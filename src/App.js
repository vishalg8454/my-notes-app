import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar, NavigationDrawer,SearchBar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <div className="app-grid-wrapper">
        <div className="app-grid-aside">
          <NavigationDrawer />
        </div>
        <div className="app-grid-main">
          <SearchBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
