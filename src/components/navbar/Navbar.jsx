import "./navbar.css";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <nav className="nav-bar">
      <div className="nav-bar-container">
        <div>
          <Link to="/home" className="logo">
            <h1 className="logo">
              <span className="primary">Note</span>
              <span className="secondary">Stalk</span>
            </h1>
          </Link>
        </div>
        <div>
          <MenuOutlined
            onClick={() => {
              setMenuActive((prevState) => !prevState);
            }}
            fontSize="large"
            className="menu"
          />
        </div>
      </div>
      {menuActive && (
        <div>
          <ul className="nav-bar-list">
            <li className="nav-bar-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-bar-item">
              <Link to="/labels">Labels</Link>
            </li>
            <li className="nav-bar-item">
              <Link to="/archive">Archive</Link>
            </li>
            <li className="nav-bar-item">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export { Navbar };
