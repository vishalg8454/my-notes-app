import "./navbar.css";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-container">
        <h1 className="logo">
          <span className="primary">Note</span>
          <span className="secondary">Stalk</span>
        </h1>
        <MenuOutlined fontSize="large" className="menu" />
      </div>
    </nav>
  );
};

export { Navbar };
