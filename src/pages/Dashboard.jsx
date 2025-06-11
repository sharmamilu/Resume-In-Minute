import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";
import { FaBriefcase, FaBookmark, FaClock, FaBell } from "react-icons/fa";
import DashboardChart from "../components/DashboardChart";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="welcome-card">
        <h2>Welcome back, {currentUser?.name} 👋</h2>
        <p>Here’s what’s happening with your job journey today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaBriefcase className="stat-icon" />
          <h3>5</h3>
          <p>Jobs Applied</p>
        </div>
        <div className="stat-card">
          <FaBookmark className="stat-icon" />
          <h3>3</h3>
          <p>Saved Jobs</p>
        </div>
        <div className="stat-card">
          <FaClock className="stat-icon" />
          <h3>2</h3>
          <p>Applications in Review</p>
        </div>
        <div className="stat-card">
          <FaBell className="stat-icon" />
          <h3>1</h3>
          <p>New Notification</p>
        </div>
      </div>

      <div className="notifications-section">
        <h4>Latest Updates</h4>
        <ul>
          <li>You have an interview scheduled with Acme Corp.</li>
          <li>Your application for Frontend Developer is under review.</li>
          <li>2 new jobs match your profile.</li>
        </ul>
      </div>


        <DashboardChart />
    </div>
  );
};

export default Dashboard;
