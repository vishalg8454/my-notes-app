import "./search-bar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <button className="search-button">
        <SearchOutlinedIcon />
      </button>
      <input className="search-bar" placeholder="Search"></input>
    </div>
  );
};
export { SearchBar };
