import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/header.css';
const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const hanleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/dashboard" className="logo">Home</Link>
      <>
        <span className="username">{currentUser.name}</span>
        <button onClick={hanleLogout} className="logout-button">Logout</button>
      </>
    </header>
  );
};

export default Header;
