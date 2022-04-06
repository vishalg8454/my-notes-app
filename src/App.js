import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar, NavigationDrawer, SearchBar, Toast } from "./components";
import { useToast } from "./context/toast-context";
import { useNote } from "./context/note-context";

function App() {
  const { show } = useToast();
  const { addBlankNote } = useNote();
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
          <button class="btn btn-float-action fab" onClick={addBlankNote}>
            +
          </button>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
