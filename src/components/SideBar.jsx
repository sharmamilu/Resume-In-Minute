import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/sidebar.css';
const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <h2 className="sidebar-logo">JobPortal</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/job-search" className={({ isActive }) => isActive ? 'active' : ''}>
            Job Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/job-posting" className={({ isActive }) => isActive ? 'active' : ''}>
            Job Posting
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''}>
            Resume
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
