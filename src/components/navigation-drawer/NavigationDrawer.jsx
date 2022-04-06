import "./navigation-drawer.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavLink } from "react-router-dom";
import { useNote } from "../../context/note-context";

const NavigationDrawer = () => {
  const { addBlankNote } = useNote();
  let activeStyle = {
    textDecoration: "underline",
    color: "#d54a31",
  };

  function addNoteHandler() {
    addBlankNote();
  }
  return (
    <aside className="navigation-drawer">
      <ul>
        <NavLink
          to="/home"
          className="navlink"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li className="navigation-item">
            <HomeOutlinedIcon
              className="navigation-icon"
              sx={{ fontSize: 32 }}
            />
            <span className="navigation-item-text">Home</span>
          </li>
        </NavLink>
        <NavLink to="/labels" className="navlink">
          <li className="navigation-item">
            <LabelOutlinedIcon
              className="navigation-icon"
              sx={{ fontSize: 32 }}
            />
            <span className="navigation-item-text">Labels</span>
          </li>
        </NavLink>
        <NavLink
          to="/archive"
          className="navlink"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li className="navigation-item">
            <ArchiveOutlinedIcon
              className="navigation-icon"
              sx={{ fontSize: 32 }}
            />
            <span className="navigation-item-text"> Archive</span>
          </li>
        </NavLink>
        <NavLink to="/trash" className="navlink">
          <li className="navigation-item">
            <DeleteOutlineOutlinedIcon
              className="navigation-icon"
              sx={{ fontSize: 32 }}
            />
            <span className="navigation-item-text">Trash</span>
          </li>
        </NavLink>
        <NavLink to="/profile" className="navlink">
          <li className="navigation-item">
            <AccountCircleOutlinedIcon
              className="navigation-icon"
              sx={{ fontSize: 32 }}
            />
            <span className="navigation-item-text">Profile</span>
          </li>
        </NavLink>
      </ul>
      <button className="create-new-note-cta" onClick={addNoteHandler}>
        Create New Note
      </button>
    </aside>
  );
};

export { NavigationDrawer };
