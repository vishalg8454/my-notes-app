import "./navigation-drawer.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useNote } from "../../context/note-context";
import { useEffect, useState } from "react";

const NavigationDrawer = () => {
  const [sortState, setSortState] = useState("");

  let navigate = useNavigate();

  const { addBlankNote, sortNewToOld, sortOldToNew } = useNote();

  useEffect(() => {
    if (sortState === "new") {
      sortNewToOld();
    }
    if (sortState === "old") {
      sortOldToNew();
    }
  }, [sortState]);

  let activeStyle = {
    textDecoration: "underline",
    color: "#d54a31",
  };

  function addNoteHandler() {
    navigate("/home");
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
        <NavLink
          to="/labels"
          className="navlink"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
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
        <NavLink
          to="/profile"
          className="navlink"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
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

      <div className="sort-container">
        <p>Sort by - </p>
        <div className="sort-div">
          <input
            id="newtoold"
            type="radio"
            name="sort"
            value="new"
            onChange={(e) => setSortState(e.target.value)}
          />
          <label htmlFor="newtoold">{" Date - Newer to Older"}</label>
        </div>
        <div className="sort-div">
          <input
            id="oldtonew"
            type="radio"
            name="sort"
            value="old"
            onChange={(e) => setSortState(e.target.value)}
          />
          <label htmlFor="oldtonew">{" Date - Older to Newer"}</label>
        </div>
      </div>
    </aside>
  );
};

export { NavigationDrawer };
