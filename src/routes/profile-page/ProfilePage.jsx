import "./profile-page.css";
import { useUser } from "../../context/user-context";
import { useNote } from "../../context/note-context";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { resetNotes, notesList } = useNote();
  const logoutHandler = () => {
    logout();
    resetNotes();
  };
  const { encodedToken, firstName, lastName, logout } = useUser();
  return (
    <main>
      {!encodedToken && (
        <button className="login-cta" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
      {encodedToken && (
        <>
          <p className="name">{`Hello ${firstName} ${lastName}`}</p>
          <p className="note-count">{`Total notes created: ${notesList.length}`}</p>
          <button className="login-cta" onClick={logoutHandler}>
            Logout
          </button>
        </>
      )}
    </main>
  );
};

export { ProfilePage };
