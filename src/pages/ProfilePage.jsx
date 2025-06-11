// pages/ProfilePage.js
import { useEffect, useState } from "react";
import '../styles/profilepage.css'
// import RenderResume from "../components/RenderResume";
const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser || {});
  }, []);

  const editProfile = () => {
    // navigate to resume-form  and pass the user data as props
    window.location.href = "/resume-form";
  };

  return (
    <div className="profile-container container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="profile-card shadow p-4 rounded">
            <h2 className="text-center mb-4">👤 Profile</h2>
            <hr />
            <p><strong>Name:</strong> {user.name || "N/A"}</p>
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
            <p><strong>Contact:</strong> {user.contact || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
          </div>
          {/* add an edit button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => { editProfile();}} >Edit Profile</button>
          </div>
        </div>
      </div>
      {/* <div className="resume-container">
        <RenderResume />
         </div> */}

    </div>
  );
};

export default ProfilePage;
