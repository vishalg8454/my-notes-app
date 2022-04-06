import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, NavigationDrawer, SearchBar, Toast } from "./components";
import { useToast } from "./context/toast-context";
import { useNote } from "./context/note-context";

function App() {
  const { show } = useToast();
  const { addBlankNote } = useNote();
  let navigate = useNavigate();

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
          <button
            className="btn btn-float-action fab"
            onClick={() => {
              navigate("/home");
              addBlankNote();
            }}
          >
            +
          </button>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
