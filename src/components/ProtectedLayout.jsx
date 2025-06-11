import Header from "./Header";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div
        style={{
          marginLeft: "220px",
          paddingTop: "60px", 
          padding: "2rem",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedLayout;
