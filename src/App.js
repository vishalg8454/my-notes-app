import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar, NavigationDrawer, SearchBar, Toast } from "./components";
import { useToast } from "./context/toast-context";

function App() {
  const { show } = useToast();
  return (
    <>
      {show && <Toast />}
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
